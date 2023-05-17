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

  // async deleteOne(email: CoachEmail) {
  //   const query = new ScanCommand({
  //     TableName: "Users",
  //     FilterExpression: "#pk = :pk",
  //     ExpressionAttributeNames: { "#pk": "pk" },
  //     ExpressionAttributeValues: { ":pk": `Coach#${email}` },
  //   });

  //   const elements = (await this.dynamoDb.client().send(query)).Items;

  //   for (const element of elements) {
  //     const deleteQ = new DeleteCommand({
  //       TableName: "Users",
  //       Key: {
  //         "pk": `Community#${email}`, "sk": element.sk,
  //       },
  //     })

  //     await this.dynamoDb.client().send(deleteQ)
  //   }
  // }
}