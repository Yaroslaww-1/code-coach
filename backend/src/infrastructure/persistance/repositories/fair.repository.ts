import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Fair } from "src/domain/fair/Fair";
import { TransactWriteItemsCommand } from "@aws-sdk/client-dynamodb";
import { QueryCommand, TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import { CommunityName } from "src/domain/community/CommunityName";
import { CoachLeftFairEvent } from "src/domain/fair/events/CoachLeftFairEvent.event";
import { CoachJoinedFairEvent } from "src/domain/fair/events/CoachJoinedFairEvent.event";

@Injectable()
export class FairRepository implements Repository<Fair> {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async save(fairE: Fair) {
    const { events, ...fair } = fairE;

    const leftEvents = events.filter(e => e instanceof CoachLeftFairEvent).map(e => e as CoachLeftFairEvent);
    const joinEvents = events.filter(e => e instanceof CoachJoinedFairEvent)
      .map(e => e as CoachJoinedFairEvent);

    await this.dynamoDb.client().send(new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: "Fairs",
            Item: {
              pk: `Fair#${fair.community}`,
              sk: "Identity",
              ...JSON.parse(JSON.stringify(fair)),
            },
          },
        },
        ...joinEvents.map(e => ({
          Put: {
            TableName: "Fairs",
            Item: {
              pk: `Fair#${fair.community}`,
              sk: `Coach#${e.coachId}`,
              email: e.coachId,
            },
          },
        })),
        ...leftEvents.map(e => ({
          Delete : {
            TableName: "Fairs",
            Key: {
              pk: `Fair#${fair.community}`,
              sk: `Coach#${e.coachId}`,
            },
          },
        })),
      ] }));
  }

  async findOne(id: CommunityName): Promise<Fair> {
    const query = new QueryCommand({
      TableName: "Fairs",
      KeyConditionExpression: "#pk = :pk and #sk = :sk",
      ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
      ExpressionAttributeValues: { ":pk": `Fair#${id}`, ":sk": "Identity" },
    });

    const fair = (await this.dynamoDb.client().send(query)).Items[0] as any;
    return Fair.initialize(fair);
  }
}