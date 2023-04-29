import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Community } from "src/domain/community/Community";
import { TransactWriteCommand } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class CommunityRepository implements Repository<Community> {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async save(entity: Community) {
    const { members, events, ...community } = entity;

    await this.dynamoDb.client().send(new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: "Communities",
            Item: {
              pk: `Community#${community.name}`,
              sk: "Identity",
              ...JSON.parse(JSON.stringify(community)),
            },
          },
        },
        ...members.map(member => ({
          Put: {
            TableName: "Communities",
            Item: {
              pk: `Community#${community.name}`,
              sk: `Member#${member}`,
              email: member,
            },
          },
        })),
      ] }));
  }
}