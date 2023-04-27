import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { StudentsSeeder } from "./students-seeder";
import { CoachesSeeder } from "./coaches-seeder";
import { Fair } from "src/domain/post/Fair";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FairsSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService,
    private readonly studentsSeeder: StudentsSeeder,
    private readonly coachesSeeder: CoachesSeeder
  ) {}

  public async seed() {
    const fair = Fair.createNew({
      startAt: new Date(2023, 4, 20),
      endAt: new Date(2023, 4, 21),
      title: "Weekly Fair",
      community: "c/Vue",
    });

    const students = this.studentsSeeder.students();
    const coaches = this.coachesSeeder.coaches();

    students.forEach(student => fair.joinAsStudent(student.email));
    coaches.forEach(coach => fair.joinAsCoach(coach.email));

    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Posts": [
          {
            PutRequest: {
              Item: {
                pk: `Fair#${fair.id}`,
                sk: "Identity",
                title: fair.title,
                startAt: fair.startAt.toISOString(),
                endAt: fair.endAt.toISOString(),
                community: fair.community,
                studentsCount: fair.studentsCount,
                coachesCount: fair.coachesCount,
              },
            },
          },
          ...students.map(student => ({
            PutRequest: {
              Item: {
                pk: `Fair#${fair.id}`,
                sk: `Student#${student.email.value}`,
                student,
              },
            },
          })),
          ...coaches.map(coach => ({
            PutRequest: {
              Item: {
                pk: `Fair#${fair.id}`,
                sk: `Coach#${coach.email.value}`,
                coach,
              },
            },
          })),
        ] },
    }));

    console.log("Fairs are seeded")
  }
}