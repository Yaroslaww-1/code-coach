import { Select } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetByCommunityIdPostsQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(communityId: string) {
    const query = new ScanCommand({
      TableName: "Posts",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "contains(#pk, :pk) and #sk = :sk",
      ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
      ExpressionAttributeValues: { ":pk": "Post#", ":sk": `Identity#${communityId}` },
    });

    return (await this.dynamoDb.client().send(query)).Items;
  }
}
