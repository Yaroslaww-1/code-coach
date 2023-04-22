import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Coach } from "src/modules/coaches/domain/Coach";

export class CoachesSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  public async seed() {
    const coaches = [
      new Coach("sam@gmail.com", "Sam Spade"),
      new Coach("joel@gmail.com", "Joel Cairo"),
    ];

    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Users": coaches.map(coach => ({
          PutRequest: {
            Item: {
              PK: `Coach#${coach.email()}`,
              SK: coach.name(),
            },
          },
        })),
      },
    }));

    console.log("Coaches are seeded")
  }
}