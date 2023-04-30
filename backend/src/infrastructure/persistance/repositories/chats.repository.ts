import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Chat } from "src/domain/chat/Chat";
import { DeleteCommand, GetCommand, TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import { MessageSent } from "src/domain/chat/events/MessageSent.event";

@Injectable()
export class ChatRepository implements Repository<Chat> {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async save(entity: Chat) {
    const { events, ...chat } = entity;

    await this.dynamoDb.client().send(new DeleteCommand({
      TableName: "Chats",
      Key: { pk: `Chat${chat.id}`, sk: "Identity" },
    }))

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
        ...events.filter(e => e instanceof MessageSent).map((e: MessageSent) => ({
          Put: {
            TableName: "Chats",
            Item: {
              pk: `Chat#${e.message.chat}`,
              sk: `Message#${e.message.createdAt.toISOString()}#${e.message.author}`,
              ...JSON.parse(JSON.stringify(e.message)),
            },
          },
        })),
      ],
    }));
  }

  async findOne(chatId: string): Promise<Chat> {
    const query = new GetCommand({
      TableName: "Chats",
      Key: {
        pk: `Chat#${chatId}`,
        sk: "Identity",
      },
    });

    const chat = await this.dynamoDb.client().send(query);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new Chat(chat.Item! as any);
  }
}