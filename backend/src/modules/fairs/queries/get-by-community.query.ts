import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetByCommunityFairQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(authenticatedUserId: string, community: string) {
    const query = new GetCommand({
      TableName: "Fairs",
      Key: {
        "pk": `Fair#${community}`,
        "sk": "Identity",
      },
    });

    const fair = (await this.dynamoDb.client().send(query)).Item;

    const queryJ = new ScanCommand({
      TableName: "Fairs",
      FilterExpression: "#pk = :pk and #sk = :sk",
      ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
      ExpressionAttributeValues: {
        ":pk": `Fair#${community}`,
        ":sk": `Coach#${authenticatedUserId}`,
      },
    });

    const isJoined = (await this.dynamoDb.client().send(queryJ)).Items.length > 0;
    fair.isJoined = isJoined;

    return fair;
  }
}
