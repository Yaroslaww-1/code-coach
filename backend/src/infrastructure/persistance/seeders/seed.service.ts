import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { CreateTableCommand, DeleteTableCommand, waitUntilTableExists, waitUntilTableNotExists } from "@aws-sdk/client-dynamodb";
import { CoachesSeeder } from "./coaches-seeder";
import { StudentsSeeder } from "./students-seeder";
import { CommunitiesSeeder } from "./communities-seeder";
import { PostsSeeder } from "./post-seeder";

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async onApplicationBootstrap() {
    const shouldSeed = process.argv.some(arg => arg.startsWith("--seed"));
    if (!shouldSeed) return;

    await Promise.all([
      this.truncate("Users"),
      this.truncate("Communities"),
      this.truncate("Posts")]);

    await Promise.all([
      new CoachesSeeder(this.dynamoDb).seed(),
      new StudentsSeeder(this.dynamoDb).seed(),
      new CommunitiesSeeder(this.dynamoDb).seed(),
      new PostsSeeder(this.dynamoDb).seed()]);
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