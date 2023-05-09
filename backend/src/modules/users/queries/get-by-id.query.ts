import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetUserByIdQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(userEmail: string) {
    const queryStudent = new GetCommand({
      TableName: "Users",
      Key: {
        pk: `Student#${userEmail}`,
        sk: "Identity",
      },
    });

    const student = (await this.dynamoDb.client().send(queryStudent)).Item;

    if (student) return student;

    const queryCoach = new GetCommand({
      TableName: "Users",
      Key: {
        pk: `Coach#${userEmail}`,
        sk: "Identity",
      },
    });

    const coach = (await this.dynamoDb.client().send(queryCoach)).Item;

    return coach;
  }
}
