import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { CreateTableCommand, DeleteTableCommand, waitUntilTableExists, waitUntilTableNotExists } from "@aws-sdk/client-dynamodb";
import { CoachesSeeder } from "./coaches-seeder";
import { StudentsSeeder } from "./students-seeder";
import { CommunitiesSeeder } from "./communities-seeder";

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async onApplicationBootstrap() {
    const shouldSeed = process.argv.some(arg => arg.startsWith("--seed"));
    if (!shouldSeed) return;

    await Promise.all([
      this.truncateUsers(),
      this.truncateCommunities()]);

    await Promise.all([
      new CoachesSeeder(this.dynamoDb).seed(),
      new StudentsSeeder(this.dynamoDb).seed(),
      new CommunitiesSeeder(this.dynamoDb).seed()]);
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

  private async truncateCommunities() {
    console.log("Start Communities table truncating")

    try {
      await this.dynamoDb.client().send(new DeleteTableCommand({
        TableName: "Communities",
      }));

      await waitUntilTableNotExists(
        { client: this.dynamoDb.client(), maxWaitTime: 300 },
        { TableName: "Communities" });
    } catch (e) {
      console.warn(`Error occurred during Communities table removal: ${e.message} `)
    }

    await this.dynamoDb.client().send(new CreateTableCommand({
      TableName: "Communities",
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
      { TableName: "Communities" });

    console.log("Communities table truncated")
  }
}