import { Select } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetMineQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(authenticatedUserId: string) {
    const query = new ScanCommand({
      TableName: "Chats",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "#member1 = :member or #member2 = :member",
      ExpressionAttributeNames: { "#member1": "member1", "#member2": "member2" },
      ExpressionAttributeValues: { ":member": authenticatedUserId },
    });

    return (await this.dynamoDb.client().send(query)).Items;
  }
}
