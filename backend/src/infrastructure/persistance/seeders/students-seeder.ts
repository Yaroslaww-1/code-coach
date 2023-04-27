import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Student } from "src/domain/student/Student";
import { Injectable } from "@nestjs/common";
import { StudentEmail } from "src/domain/student/StudentEmail";

@Injectable()
export class StudentsSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  public students() {
    return [
      Student.createNew({ email: new StudentEmail("barbara.amory@gmail.com"), name: "Barbara Amory" }),
      Student.createNew({ email: new StudentEmail("barbara.franklin@gmail.com"), name: "Barbara Franklin" }),
      Student.createNew({ email: new StudentEmail("beatrice.lippincott@gmail.com"), name: "Beatrice Lippincott" }),
      Student.createNew({ email: new StudentEmail("bella.duveen@gmail.com"), name: "Bella Duveen" }),
    ]
  }

  public async seed() {
    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Users": this.students().map(student => ({
          PutRequest: {
            Item: {
              pk: `Student#${student.email.value}`,
              sk: student.name,
            },
          },
        })),
      },
    }));

    console.log("Students are seeded")
  }
}