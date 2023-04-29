import { DynamoDbService } from "../../aws/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { Repository } from "./repository";
import { Fair } from "src/domain/fair/Fair";
import { TransactWriteItemsCommand } from "@aws-sdk/client-dynamodb";
import { TransactWriteCommand } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class FairRepository implements Repository<Fair> {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async save(fairE: Fair) {
    const { events, students, coaches, ...fair } = fairE;

    await this.dynamoDb.client().send(new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: "Fairs",
            Item: {
              pk: `Fair#${fair.id}`,
              sk: "Identity",
              ...JSON.parse(JSON.stringify(fair)),
            },
          },
        },
        ...students.map(student => ({
          Put: {
            TableName: "Fairs",
            Item: {
              pk: `Fair#${fair.id}`,
              sk: `Student#${student}`,
              email: student,
            },
          },
        })),
        ...coaches.map(coach => ({
          Put: {
            TableName: "Fairs",
            Item: {
              pk: `Fair#${fair.id}`,
              sk: `Student#${coach}`,
              email: coach,
            },
          },
        })),
      ] }));
  }
}