import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Select } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetAllCoachesQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute() {
    const query = new ScanCommand({
      TableName: "Users",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "contains(#pk, :pk)",
      ExpressionAttributeNames: { "#pk": "pk" },
      ExpressionAttributeValues: { ":pk": "Coach#" },
      Limit: 10,
    });

    const coaches = await this.dynamoDb.client().send(query);
    coaches.Items = coaches.Items.map(coach => ({
      ...coach,
      "email": (<string>coach["pk"]).replace("Coach#", ""),
      "name": coach["sk"],
    }))

    return coaches;
  }
}
