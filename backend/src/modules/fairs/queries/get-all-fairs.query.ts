import { Select } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetAllFairsQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute() {
    const query = new ScanCommand({
      TableName: "Posts",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "contains(#pk, :pk) and #sk = :sk",
      ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
      ExpressionAttributeValues: { ":pk": "Fair#", ":sk": "Identity" },
      Limit: 10,
    });

    const fairs = await this.dynamoDb.client().send(query);
    fairs.Items = fairs.Items.map(fair => ({
      ...fair,
      "id": (<string>fair["pk"]).replace("Fair#", ""),
    }))

    return fairs;
  }
}