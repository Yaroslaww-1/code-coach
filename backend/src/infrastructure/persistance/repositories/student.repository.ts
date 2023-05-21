import { QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Student } from "src/domain/user/student/Student";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { StudentEmail } from "src/domain/user/student/StudentEmail";
import { Select } from "@aws-sdk/client-dynamodb";

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
        sk: "Identity",
        role: "Student",
        ...JSON.parse(JSON.stringify(student)),
      },
    }));
  }

  async findOne(id: StudentEmail): Promise<Student> {
    const query = new QueryCommand({
      TableName: "Users",
      Select: Select.ALL_ATTRIBUTES,
      KeyConditionExpression: "#pk = :pk",
      ExpressionAttributeNames: { "#pk": "pk" },
      ExpressionAttributeValues: { ":pk": `Student#${id}` },
    });

    const student = (await this.dynamoDb.client().send(query)).Items[0] as any;
    return Student.initialize(student);
  }
}