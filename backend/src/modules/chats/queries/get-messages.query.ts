import { Select } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetMessagesQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(chatId: string) {
    const query = new ScanCommand({
      TableName: "Chats",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "#pk = :pk and contains(#sk, :sk)",
      ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
      ExpressionAttributeValues: { ":pk": `Chat#${chatId}`, ":sk": "Message#" },
      Limit: 10,
    });

    return await this.dynamoDb.client().send(query);
  }
}
