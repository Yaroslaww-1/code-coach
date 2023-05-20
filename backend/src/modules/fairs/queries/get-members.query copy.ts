// import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
// import { Injectable } from "@nestjs/common";
// import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

// @Injectable()
// export class GetMembersQuery {
//   constructor (
//     private readonly dynamoDb: DynamoDbService
//   ) {}

//   async execute(community: string) {
//     const query = new GetCommand({
//       TableName: "Fairs",
//       Key: {
//         "pk": `Fair#${community}`,
//         "sk": "Identity",
//       },
//     });

//     return (await this.dynamoDb.client().send(query)).Item;
//   }
// }
