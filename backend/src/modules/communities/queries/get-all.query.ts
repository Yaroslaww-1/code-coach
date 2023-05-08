import { Select } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";
import { IdentityManagerService } from "src/modules/auth/services/identity-manager.service";

@Injectable()
export class GetAllCommunitiesQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService,
    private readonly identityManagerService: IdentityManagerService
  ) {}

  async execute(authenticatedUserId: string) {
    const authenticatedUser = await this.identityManagerService.getAuthenticatedUser(authenticatedUserId);

    const query = new ScanCommand({
      TableName: "Communities",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "contains(#pk, :pk) and #sk = :sk",
      ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
      ExpressionAttributeValues: { ":pk": "Community#", ":sk": "Identity" },
    });

    const communities = (await this.dynamoDb.client().send(query)).Items;

    for (const community of communities) {
      const query = new ScanCommand({
        TableName: "Communities",
        Select: Select.ALL_ATTRIBUTES,
        FilterExpression: "#pk = :pk and #sk = :sk",
        ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
        ExpressionAttributeValues: {
          ":pk": `Community#${community.name}`,
          ":sk": `Member#${authenticatedUser.email}`,
        },
      });

      const isJoined = (await this.dynamoDb.client().send(query)).Items.length > 0;
      community.isJoined = isJoined;
    }

    return communities;
  }
}
