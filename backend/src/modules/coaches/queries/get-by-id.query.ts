import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetCoachByIdQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(id: string) {
    const query = new GetCommand({
      TableName: "Users",
      Key: { "pk": `Coach#${id}`, "sk": "Identity" },
    });

    return (await this.dynamoDb.client().send(query)).Item;
  }
}
