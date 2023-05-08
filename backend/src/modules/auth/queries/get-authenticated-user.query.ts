// import { ScanCommand } from "@aws-sdk/lib-dynamodb";
// import { Select } from "@aws-sdk/client-dynamodb";
// import { Injectable } from "@nestjs/common";
// import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

// @Injectable()
// export class GetAuthenticatedUserQuery {
//   constructor (
//     private readonly dynamoDb: DynamoDbService
//   ) {}

//   async execute() {
//     const query = new ScanCommand({
//       TableName: "Users",
//       Select: Select.ALL_ATTRIBUTES,
//       FilterExpression: "#pk = :pk",
//       ExpressionAttributeNames: { "#pk": "pk" },
//       ExpressionAttributeValues: { ":pk": "Student#barbara.amory@gmail.com" },
//       Limit: 10,
//     });

//     return await this.dynamoDb.client().send(query);
//   }
// }
