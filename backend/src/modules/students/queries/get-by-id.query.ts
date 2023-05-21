import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Injectable()
export class GetStudentByIdQuery {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  async execute(id: string) {
    const query = new GetCommand({
      TableName: "Users",
      Key: {
        "pk": `Student#${id}`,
        "sk": "Identity",
      },
    });

    console.log(id)

    return (await this.dynamoDb.client().send(query)).Item;
  }
}
