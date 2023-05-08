import { Select } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetByIdPostQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(postId: string) {
    const query = new ScanCommand({
      TableName: "Posts",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "#pk = :pk and contains(#sk, :sk)",
      ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
      ExpressionAttributeValues: { ":pk": `Post#${postId}`, ":sk": "Identity#" },
    });

    return (await this.dynamoDb.client().send(query)).Items[0];
  }
}
