import { BadRequestException, Injectable } from "@nestjs/common";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";
import { Coach } from "src/domain/user/coach/Coach";
import * as bcrypt from "bcrypt";
import { Student } from "src/domain/user/student/Student";
import { StudentRepository } from "src/infrastructure/persistance/repositories/student.repository";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class RegisterCommand {
  constructor (
    private readonly coachRepository: CoachRepository,
    private readonly studentRepository: StudentRepository,
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(email: string, password: string, role: string) {
    const queryStudent = new ScanCommand({
      TableName: "Users",
      FilterExpression: "contains(#pk, :pk)",
      ExpressionAttributeNames: { "#pk": "pk" },
      ExpressionAttributeValues: { ":pk": `Student#${email}` },
    });
    const students = (await this.dynamoDb.client().send(queryStudent)).Items;
    if (students.length > 0) throw new BadRequestException("User already exists!");

    const queryCoach = new ScanCommand({
      TableName: "Users",
      FilterExpression: "contains(#pk, :pk)",
      ExpressionAttributeNames: { "#pk": "pk" },
      ExpressionAttributeValues: { ":pk": `Coach#${email}` },
    });
    const coaches = (await this.dynamoDb.client().send(queryCoach)).Items;
    if (coaches.length > 0) throw new BadRequestException("User already exists!");

    const passwordHashed = await bcrypt.hash(password, 10);

    if (role.toLowerCase() === "coach") {
      const coach = Coach.createNew({ email, passwordHashed });
      await this.coachRepository.save(coach);
    }

    if (role.toLowerCase() === "student") {
      const student = Student.createNew({ email, passwordHashed });
      await this.studentRepository.save(student);
    }
  }
}
