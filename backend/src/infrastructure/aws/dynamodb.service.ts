import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DynamoDbService {
  readonly #client: DynamoDBDocument;

  constructor() {
    this.#client = DynamoDBDocument.from(
      new DynamoDB({ region: "eu-central-1" }),
      {
        marshallOptions: {
          removeUndefinedValues: true,
          convertClassInstanceToMap: true,
        },
      });
  }

  public client(): DynamoDBDocument {
    return this.#client;
  }
}