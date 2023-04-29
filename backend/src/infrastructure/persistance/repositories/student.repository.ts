import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Student } from "src/domain/student/Student";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";

@Injectable()
export class StudentRepository implements Repository<Student> {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async save(entity: Student) {
    const { events, ...student } = entity;

    await this.dynamoDb.client().send(new PutCommand({
      TableName: "Users",
      Item: {
        pk: `Student#${student.email}`,
        sk: student.name,
        ...JSON.parse(JSON.stringify(student)),
      },
    }));
  }
}