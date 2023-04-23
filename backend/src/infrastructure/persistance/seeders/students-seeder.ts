import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Student } from "src/domain/Student";

export class StudentsSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  public async seed() {
    const students = [
      new Student("barbara.amory@gmail.com", "Barbara Amory"),
      new Student("barbara.franklin@gmail.com", "Barbara Franklin"),
      new Student("beatrice.lippincott@gmail.com", "Beatrice Lippincott"),
      new Student("bella.duveen@gmail.com", "Bella Duveen"),
    ];

    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Users": students.map(coach => ({
          PutRequest: {
            Item: {
              pk: `Student#${coach.email()}`,
              sk: coach.name(),
            },
          },
        })),
      },
    }));

    console.log("Students are seeded")
  }
}