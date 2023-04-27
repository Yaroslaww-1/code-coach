import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Community } from "src/domain/Community";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CommunitiesSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  public async seed() {
    const vue = Community.createNew({ name: "c/Vue", description: "The largest Vue developers community." });
    const react = Community.createNew({ name: "c/React", description: "The largest Vue developers community." });

    const communities = [vue, react];

    vue.join("abe.ryland@gmail.com");
    vue.join("abigail@gmail.com");
    vue.join("barbara.amory@gmail.com");
    vue.join("barbara.franklin@gmail.com");

    react.join("adela.marchmont@gmail.com");
    react.join("beatrice.lippincott@gmail.com");
    react.join("bella.duveen@gmail.com");

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
                pk: `Community#${community.name}`,
                sk: "Identity",
                description: community.description,
                membersCount: community.membersCount,
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

    console.log("Communities are seeded")
  }
}