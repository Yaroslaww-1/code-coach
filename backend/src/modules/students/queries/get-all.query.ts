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
      ExpressionAttributeNames: { "#pk": "pk" },
      ExpressionAttributeValues: { ":pk": "Student#" },
      Limit: 10,
    });

    return (await this.dynamoDb.client().send(query)).Items;
  }
}
