import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Chat } from "src/domain/chat/Chat";
import { TransactWriteCommand } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class ChatRepository implements Repository<Chat> {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async save(entity: Chat) {
    const { events, messages, ...chat } = entity;

    await this.dynamoDb.client().send(new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: "Chats",
            Item: {
              pk: `Chat#${chat.id}`,
              sk: "Identity",
              ...JSON.parse(JSON.stringify(chat)),
            },
          },
        },
        ...messages.map(message => ({
          Put: {
            TableName: "Chats",
            Item: {
              pk: `Chat#${message.chat}`,
              sk: `Message#${message.createdAt.toISOString()}#${message.author}`,
              ...JSON.parse(JSON.stringify(message)),
            },
          },
        })),
      ],
    }));
  }
}