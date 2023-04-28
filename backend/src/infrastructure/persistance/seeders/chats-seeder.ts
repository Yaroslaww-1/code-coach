import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Chat } from "src/domain/chat/Chat";
import { CoachesSeeder } from "./coaches-seeder";
import { StudentsSeeder } from "./students-seeder";

@Injectable()
export class ChatsSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService,
    private readonly coachesSeeder: CoachesSeeder,
    private readonly studentsSeeder: StudentsSeeder
  ) {}

  public chats() {
    const students = this.studentsSeeder.students();
    const coaches = this.coachesSeeder.coaches();

    return [
      Chat.createNew({ member1: students[0].email, member2: coaches[0].email }),
      Chat.createNew({ member1: students[1].email, member2: coaches[1].email }),
    ]
  }

  private messages() {
    const chats = this.chats();

    const message1 = chats[0].send("Hey!", chats[0].member1);
    const message2 = chats[0].send("Hello!", chats[0].member2);

    return [message1, message2];
  }

  public async seed() {
    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Chats": [
          ...this.chats().map(chat => ({
            PutRequest: {
              Item: {
                pk: `Chat#${chat.id.value}`,
                sk: "Identity",
                member1: chat.member1.value,
                member2: chat.member2.value,
              },
            },
          })),
          ...this.messages().map(message => ({
            PutRequest: {
              Item: {
                pk: `Chat#${message.chat.value}`,
                sk: `Message#${message.createdAt.toISOString()}#${message.author.value}`,
                content: message.content,
                author: message.author.value,
              },
            },
          })),
        ],
      },
    }));

    console.log("Chats are seeded")
  }
}