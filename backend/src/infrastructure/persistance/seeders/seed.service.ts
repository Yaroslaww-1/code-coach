import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { CreateTableCommand, DeleteTableCommand, waitUntilTableExists, waitUntilTableNotExists } from "@aws-sdk/client-dynamodb";
import { CoachesSeeder } from "./coaches-seeder";

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async onApplicationBootstrap() {
    const shouldSeed = process.argv.some(arg => arg.startsWith("--seed"));
    if (!shouldSeed) return;

    await this.truncateUsers();
    await new CoachesSeeder(this.dynamoDb).seed();
  }

  private async truncateUsers() {
    console.log("Start Users table truncating")

    try {
      await this.dynamoDb.client().send(new DeleteTableCommand({
        TableName: "Users",
      }));

      await waitUntilTableNotExists(
        { client: this.dynamoDb.client(), maxWaitTime: 300 },
        { TableName: "Users" });
    } catch (e) {
      console.warn(`Error occurred during Users table removal: ${e.message} `)
    }

    await this.dynamoDb.client().send(new CreateTableCommand({
      TableName: "Users",
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      KeySchema: [
        { AttributeName: "PK", KeyType: "HASH" },
        { AttributeName: "SK", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" },
      ],
    }));

    await waitUntilTableExists(
      { client: this.dynamoDb.client(), maxWaitTime: 300 },
      { TableName: "Users" });

    console.log("Users table truncated")
  }
}