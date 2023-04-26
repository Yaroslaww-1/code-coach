import { Module } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";

@Module({
  imports: [],
  providers: [DynamoDbService],
  exports: [DynamoDbService],
})
export class AwsModule {}