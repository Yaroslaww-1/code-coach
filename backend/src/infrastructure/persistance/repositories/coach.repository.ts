import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Coach } from "src/domain/user/coach/Coach";

@Injectable()
export class CoachRepository implements Repository<Coach> {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async save(entity: Coach) {
    const { events, ...coach } = entity;

    await this.dynamoDb.client().send(new PutCommand({
      TableName: "Users",
      Item: {
        pk: `Coach#${coach.email}`,
        sk: "Identity",
        role: "Coach",
        ...JSON.parse(JSON.stringify(coach)),
      },
    }));
  }
}