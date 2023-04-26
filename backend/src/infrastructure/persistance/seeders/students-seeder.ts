import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Student } from "src/domain/Student";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StudentsSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  public students() {
    return [
      new Student("barbara.amory@gmail.com", "Barbara Amory"),
      new Student("barbara.franklin@gmail.com", "Barbara Franklin"),
      new Student("beatrice.lippincott@gmail.com", "Beatrice Lippincott"),
      new Student("bella.duveen@gmail.com", "Bella Duveen"),
    ]
  }

  public async seed() {
    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Users": this.students().map(coach => ({
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