import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Select } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetAllStudentsQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute() {
    const query = new ScanCommand({
      TableName: "Users",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "contains(#pk, :pk)",
      ExpressionAttributeNames: { "#pk": "PK" },
      ExpressionAttributeValues: { ":pk": "Student#" },
      Limit: 10,
    });

    const students = await this.dynamoDb.client().send(query);

    students.Items = students.Items.map(student => ({
      "email": (<string>student["PK"]).replace("Student#", ""),
      "name": student["SK"],
    }))

    return students;
  }
}
