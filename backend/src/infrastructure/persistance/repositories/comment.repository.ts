import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Comment } from "src/domain/comment/Comment";
import { CommentId } from "src/domain/comment/CommentId";
import { Select } from "@aws-sdk/client-dynamodb";

@Injectable()
export class CommentRepository implements Repository<Comment> {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async save(entity: Comment) {
    const { events, ...comment } = entity;

    await this.dynamoDb.client().send(new PutCommand({
      TableName: "Posts",
      Item: {
        pk: `Post#${comment.postId}`,
        sk: `Comment#${comment.id}`,
        ...JSON.parse(JSON.stringify(comment)),
      },
    }));
  }

  async findOne(id: CommentId): Promise<Comment> {
    const query = new ScanCommand({
      TableName: "Posts",
      Select: Select.ALL_ATTRIBUTES,
      FilterExpression: "contains(#pk, :pk) and contains(#sk, :sk)",
      ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
      ExpressionAttributeValues: { ":pk": "Post#", ":sk": `Comment#${id}` },
    });

    const comment = (await this.dynamoDb.client().send(query)).Items[0] as any;
    return Comment.initialize(comment);
  }
}