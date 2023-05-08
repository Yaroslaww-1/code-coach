// import { Select } from "@aws-sdk/client-dynamodb";
// import { ScanCommand } from "@aws-sdk/lib-dynamodb";
// import { Injectable } from "@nestjs/common";
// import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

// @Injectable()
// export class GetMinePostsQuery {
//   constructor (
//     private readonly dynamoDb: DynamoDbService,
//     private readonly
//   ) {}

//   async execute(authenticatedUserId: string) {
//     const query = new ScanCommand({
//       TableName: "Posts",
//       Select: Select.ALL_ATTRIBUTES,
//       FilterExpression: "contains(#pk, :pk) and #sk = :sk",
//       ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" },
//       ExpressionAttributeValues: { ":pk": "Post#", ":sk": "Identity" },
//       Limit: 10,
//     });

//     return await this.dynamoDb.client().send(query);
//   }
// }
