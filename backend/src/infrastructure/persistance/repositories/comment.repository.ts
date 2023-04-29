import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Comment } from "src/domain/comment/Comment";

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
}