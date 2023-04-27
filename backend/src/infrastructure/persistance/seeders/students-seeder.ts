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
      Student.createNew({ email: "barbara.amory@gmail.com", name: "Barbara Amory" }),
      Student.createNew({ email: "barbara.franklin@gmail.com", name: "Barbara Franklin" }),
      Student.createNew({ email: "beatrice.lippincott@gmail.com", name: "Beatrice Lippincott" }),
      Student.createNew({ email: "bella.duveen@gmail.com", name: "Bella Duveen" }),
    ]
  }

  public async seed() {
    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Users": this.students().map(student => ({
          PutRequest: {
            Item: {
              pk: `Student#${student.email}`,
              sk: student.name,
            },
          },
        })),
      },
    }));

    console.log("Students are seeded")
  }
}