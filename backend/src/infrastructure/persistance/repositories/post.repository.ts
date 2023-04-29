import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Post } from "src/domain/post/Post";

@Injectable()
export class PostRepository implements Repository<Post> {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async save(entity: Post) {
    const { events, ...post } = entity;

    await this.dynamoDb.client().send(new PutCommand({
      TableName: "Posts",
      Item: {
        pk: `Post#${post.id}`,
        sk: "Identity",
        ...JSON.parse(JSON.stringify(post)),
      },
    }));
  }
}