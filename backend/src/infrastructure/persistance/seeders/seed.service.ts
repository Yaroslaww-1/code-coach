import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { AttributeValue, CreateTableCommand, DeleteTableCommand, ScalarAttributeType, waitUntilTableExists, waitUntilTableNotExists } from "@aws-sdk/client-dynamodb";
import { CoachesSeeder } from "./coaches-seeder";
import { StudentsSeeder } from "./students-seeder";

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
    await new StudentsSeeder(this.dynamoDb).seed();
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
      { TableName: "Users" });

    console.log("Users table truncated")
  }
}