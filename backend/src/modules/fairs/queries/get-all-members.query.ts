import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetAllMembersQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(student: string) {
    const queryCommunities = new ScanCommand({
      TableName: "Communities",
      FilterExpression: "#sk = :sk",
      ExpressionAttributeNames: { "#sk": "sk" },
      ExpressionAttributeValues: {
        ":sk": `Member#${student}`,
      },
    });

    const studentCommunities = (await this.dynamoDb.client().send(queryCommunities)).Items.map(c => c.pk.split("#")[1]);

    const coaches = [];

    for (const community of studentCommunities) {
      const query = new ScanCommand({
        TableName: "Fairs",
        FilterExpression: "#pk = :pk and contains(#sk, :sk)",
        ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
        ExpressionAttributeValues: {
          ":pk": "Fair#vue",
          ":sk": "Coach#",
        },
      });

      const results = (await this.dynamoDb.client().send(query)).Items.map(coach => ({ coach, community }));
      coaches.push(...results);
    }

    const groupedCoaches = [];

    for (const { coach, community } of coaches) {
      if (groupedCoaches.some(c => c.email === coach.email)) {
        groupedCoaches.find(c => c.email === coach.email).communities.push(community)
      } else {
        coach.communities = [community];
        groupedCoaches.push(coach);
      }
    }

    return groupedCoaches;
  }
}
