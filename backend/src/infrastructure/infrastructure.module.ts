import { Module } from "@nestjs/common";
import { DynamoDbService } from "./aws/dynamodb.service";

@Module({
  providers: [DynamoDbService],
  exports: [DynamoDbService],
})
export class InfrastructureModule {}