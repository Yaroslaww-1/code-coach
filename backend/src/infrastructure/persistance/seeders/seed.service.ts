import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { CreateTableCommand, DeleteTableCommand, waitUntilTableExists, waitUntilTableNotExists } from "@aws-sdk/client-dynamodb";
import { ChatRepository } from "../repositories/chats.repository";
import { CoachRepository } from "../repositories/coach.repository";
import { CommentRepository } from "../repositories/comment.repository";
import { CommunityRepository } from "../repositories/community.repository";
import { FairRepository } from "../repositories/fair.repository";
import { PostRepository } from "../repositories/post.repository";
import { StudentRepository } from "../repositories/student.repository";
import Students from "./data/students";
import Coaches from "./data/coaches";
import Chats from "./data/chats";
import Comments from "./data/comments";
import Communities from "./data/communities";
import Fairs from "./data/fairs";
import Posts from "./data/posts";

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor (
    private readonly dynamoDb: DynamoDbService,
    private readonly chatRepository: ChatRepository,
    private readonly coachRepository: CoachRepository,
    private readonly commentRepository: CommentRepository,
    private readonly communityRepository: CommunityRepository,
    private readonly fairRepository: FairRepository,
    private readonly postRepository: PostRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  async onApplicationBootstrap() {
    const shouldSeed = process.argv.some(arg => arg.startsWith("--seed"));
    if (!shouldSeed) return;

    try {

      await Promise.all([
        this.truncate("Users"),
        this.truncate("Communities"),
        this.truncate("Posts"),
        this.truncate("Chats"),
        this.truncate("Fairs"),
      ]);

      await Promise.all([
        ...Chats.data.map(i => this.chatRepository.save(i)),
        ...Coaches.data.map(i => this.coachRepository.save(i)),
        ...Comments.data.map(i => this.commentRepository.save(i)),
        ...Communities.data.map(i => this.communityRepository.save(i)),
        ...Fairs.data.map(i => this.fairRepository.save(i)),
        ...Posts.data.map(i => this.postRepository.save(i)),
        ...Students.data.map(i => this.studentRepository.save(i)),
      ]);

      console.log("Seeded successfully");
    } catch (e) {
      console.error("Seeding failed ", e)
    } 
  }

  private async truncate(table: string) {
    console.log(`Start ${table} table truncating`)

    try {
      await this.dynamoDb.client().send(new DeleteTableCommand({
        TableName: table,
      }));

      await waitUntilTableNotExists(
        { client: this.dynamoDb.client(), maxWaitTime: 300 },
        { TableName: table });
    } catch (e) {
      console.warn(`Error occurred during ${table} table removal: ${e.message} `)
    }

    await this.dynamoDb.client().send(new CreateTableCommand({
      TableName: table,
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      KeySchema: [
        { AttributeName: "pk", KeyType: "HASH" },
        { AttributeName: "sk", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "pk", AttributeType: "S" },
        { AttributeName: "sk", AttributeType: "S" },
      ],
    }));

    await waitUntilTableExists(
      { client: this.dynamoDb.client(), maxWaitTime: 300 },
      { TableName: table });

    console.log(`${table} table truncated`)
  }
}