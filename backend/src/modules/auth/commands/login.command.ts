import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";
import * as bcrypt from "bcrypt";


@Injectable()
export class LoginCommand {
  constructor (
    private readonly dynamoDb: DynamoDbService,
  ) {}

  async execute(email: string, password: string) {
    const query = new ScanCommand({
      TableName: "Users",
      FilterExpression: "#pk = :pkS or #pk = :pkC",
      ExpressionAttributeNames: { "#pk": "pk" },
      ExpressionAttributeValues: { ":pkS": `Student#${email}`, ":pkC": `Coach#${email}` },
      Limit: 10,
    });

    const user = (await this.dynamoDb.client().send(query)).Items[0];

    if (!user) throw new NotFoundException("User with login not found!");

    const isMatch = await bcrypt.compare(password, user.passwordHashed);

    if (!isMatch) throw new ForbiddenException("Password is incorrect!");

    return { email };
  }
}
