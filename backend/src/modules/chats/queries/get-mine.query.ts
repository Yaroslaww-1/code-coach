import { Select } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { StudentEmail } from "src/domain/student/StudentEmail";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetMineQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute() {
    const identity = new StudentEmail("barbara.amory@gmail.com")

    const query = new ScanCommand({
      TableName: "Chats",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "#member1 = :member or #member2 = :member",
      ExpressionAttributeNames: { "#member1": "member1", "#member2": "member2" },
      ExpressionAttributeValues: { ":member": identity.value },
      Limit: 10,
    });

    const chats = await this.dynamoDb.client().send(query);
    chats.Items = chats.Items.map(chat => ({
      ...chat,
      "id": (<string>chat["pk"]).replace("Chat#", ""),
    }))

    return chats;
  }
}
