import { Select } from "@aws-sdk/client-dynamodb";
import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetByIdQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(id: string) {
    const query = new GetCommand({
      TableName: "Chats",
      Key: {
        "pk": `Chat#${id}`,
        "sk": "Identity",
      },
    });

    return (await this.dynamoDb.client().send(query)).Item;
  }
}
