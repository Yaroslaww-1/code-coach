import { Select } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetByPostQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(postId: string) {
    const query = new ScanCommand({
      TableName: "Posts",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "#pk = :pk and contains(#sk, :sk)",
      ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
      ExpressionAttributeValues: { ":pk": `Post#${postId}`, ":sk": "Comment#" },
      Limit: 10,
    });

    const comments = await this.dynamoDb.client().send(query);
    comments.Items = comments.Items.map(comment => {
      const id = (<string>comment["sk"]).split("#").pop();
      const replies = comments.Items.filter(comment => comment.replyTo === id); 

      return {
        ...comment,
        "postId": (<string>comment["pk"]).replace("Post#", ""),
        id,
        replies,
      }})
      .filter(comment => comment["replyTo"] === postId)

    return comments;
  }
}
