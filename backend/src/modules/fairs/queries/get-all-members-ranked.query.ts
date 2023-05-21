import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";
import { GetAllMembersQuery } from "./get-all-members.query";
import { InvokeEndpointCommand } from "@aws-sdk/client-sagemaker-runtime";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";
import { StudentRepository } from "src/infrastructure/persistance/repositories/student.repository";
import { Student } from "src/domain/user/student/Student";
import { SagemakerService } from "src/infrastructure/aws/sagemaker.service";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

type FairCoach = { email: string, communities: [] };
type RankedCoach = FairCoach & { recommended: boolean };

@Injectable()
export class GetAllMembersRankedQuery {
  constructor (
    private readonly getAllMembersQuery: GetAllMembersQuery,
    private readonly coachRepository: CoachRepository,
    private readonly studentRepository: StudentRepository,
    private readonly sagemakerService: SagemakerService
  ) {}

  async execute(studentEmail: string) {
    const coaches: FairCoach[] = await this.getAllMembersQuery.execute(studentEmail);
    const student = await this.studentRepository.findOne(studentEmail);

    if (process.env.USE_SAGEMAKER === "true") {
      try {
        return await this.rankUsingSagemaker(coaches, student);
      } catch (e) {
        console.error(e);
        return await this.rankUsingCustomLogic(coaches, student);
      }
    } else {
      return await this.rankUsingCustomLogic(coaches, student);
    }
  }

  private async rankUsingSagemaker(coaches: FairCoach[], student: Student): Promise<RankedCoach[]> {
    const actions = this.readActions();
    const input = this.oneHotEncode(coaches, student, actions);

    const body = {
      "instances": input.map(([studentEncoded, coachEncoded]) => ({
        "input_1": studentEncoded, "input_2": coachEncoded,
      })),
    }

    console.dir(body, { depth: null });

    const command = new InvokeEndpointCommand({
      EndpointName: "sagemaker-soln-crs-js-xd5uponeural-collab-filtering-endpoint",
      Body: Buffer.from(JSON.stringify(body)),
      ContentType: "application/json",
    })

    const response = await this.sagemakerService.client().send(command);

    const { predictions } = JSON.parse(Buffer.from(response.Body).toString("utf8"));

    console.log(predictions); 

    return coaches.map((coach, index) => ({
      ...coach,
      recommended: Number.parseFloat(predictions[index]) >= 0.5,
    }));
  }

  private readActions() {
    const actions = fs.readFileSync(path.join(__dirname, "../../../resources/actions.csv")).toString();

    const records = parse(actions, {
      columns: true,
      delimiter: ",",
    });

    return records;
  }

  private oneHotEncode(coaches: FairCoach[], student: Student, actions: any[]) {
    const studentIdToMap = new Map<string, number>();
    const coachIdToMap = new Map<string, number>();
    for (const { student_id: studentId, coach_id: coachId } of actions) {
      if (!studentIdToMap.has(studentId)) {
        studentIdToMap.set(studentId, studentIdToMap.size + 1);
      }

      if (!coachIdToMap.has(coachId)) {
        coachIdToMap.set(coachId, coachIdToMap.size + 1);
      }
    }

    for (const record of actions) {
      record.studentId = studentIdToMap.get(record.student_id);
      record.studentIdString = record.student_id;
      record.coachId = coachIdToMap.get(record.coach_id);
      record.coachIdString = record.coach_id;
      record.relevance = Number.parseInt(record.relevance);
      delete record.student_id;
      delete record.coach_id;
    }

    return coaches.map(coach => {
      const studentEncoded = Array(studentIdToMap.size).fill(0);
      studentEncoded[studentIdToMap.get(student.email) - 1] = 1;

      const coachEncoded = Array(coachIdToMap.size).fill(0);
      coachEncoded[coachIdToMap.get(coach.email) - 1] = 1;

      return [studentEncoded, coachEncoded];
    });
  }

  private async rankUsingCustomLogic(coaches: FairCoach[], student: Student): Promise<RankedCoach[]> {
    const results: RankedCoach[] = [];

    for await (const fairCoach of coaches) {
      const coach = await this.coachRepository.findOne(fairCoach.email);

      const haveCommonProgrammingLanguages = coach.programmingLanguages
        .some(r=> student.programmingLanguages.includes(r));

      console.log(coach.programmingLanguages, student.programmingLanguages, haveCommonProgrammingLanguages);

      results.push({ ...fairCoach, recommended: haveCommonProgrammingLanguages });
    }

    return results;
  }
}
