import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Community } from "src/domain/community/Community";
import { DeleteCommand, QueryCommand, ScanCommand, TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import { UserJoinedCommunityEvent } from "src/domain/community/events/UserJoinedCommunityEvent.event";
import { CommunityName } from "src/domain/community/CommunityName";
import { Select } from "@aws-sdk/client-dynamodb";
import { UserLeftCommunityEvent } from "src/domain/community/events/UserLeftCommunityEvent.event";

@Injectable()
export class CommunityRepository implements Repository<Community> {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async save(entity: Community) {
    const { events, ...community } = entity;

    const leftEvents = events.filter(e => e instanceof UserLeftCommunityEvent).map(e => e as UserLeftCommunityEvent);
    const joinEvents = events.filter(e => e instanceof UserJoinedCommunityEvent)
      .map(e => e as UserJoinedCommunityEvent);

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
        ...joinEvents.map(e => ({
          Put: {
            TableName: "Communities",
            Item: {
              pk: `Community#${community.name}`,
              sk: `Member#${e.userId}`,
              email: e.userId,
            },
          },
        })),
        ...leftEvents.map(e => ({
          Delete : {
            TableName: "Communities",
            Key: {
              pk: `Community#${community.name}`,
              sk: `Member#${e.userId}`,
            },
          },
        })),
      ] }));
  }

  async findOne(id: CommunityName): Promise<Community> {
    const query = new QueryCommand({
      TableName: "Communities",
      Select: Select.ALL_ATTRIBUTES,
      KeyConditionExpression: "#pk = :pk and #sk = :sk",
      ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
      ExpressionAttributeValues: { ":pk": `Community#${id}`, ":sk": "Identity" },
    });

    const community = (await this.dynamoDb.client().send(query)).Items[0] as any;
    return Community.initialize(community);
  }
}