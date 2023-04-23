import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Community } from "src/domain/Community";

export class CommunitiesSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  public async seed() {
    const communities = [
      new Community("c/Vue", "The largest Vue developers community.", 4),
      new Community("c/React", "The largest Vue developers community.", 3),
    ];

    const members = [
      // Coaches
      ["c/Vue", "abe.ryland@gmail.com"],
      ["c/Vue", "abigail@gmail.com"],
      ["c/React", "adela.marchmont@gmail.com"],

      // Students
      ["c/Vue", "barbara.amory@gmail.com"],
      ["c/Vue", "barbara.franklin@gmail.com"],
      ["c/React", "beatrice.lippincott@gmail.com"],
      ["c/React", "bella.duveen@gmail.com"],
    ]

    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Communities": [
          ...communities.map(community => ({
            PutRequest: {
              Item: {
                pk: `Community#${community.name()}`,
                sk: "Identity",
                description: community.description(),
                membersCount: community.membersCount(),
              },
            },
          })),
          ...members.map(([community, member]) => ({
            PutRequest: {
              Item: {
                pk: `Community#${community}`,
                sk: `Member#${member}`,
              },
            },
          })),
        ],
      },
    }));

    console.log("Students are seeded")
  }
}