import { Module } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";
import { SagemakerService } from "./sagemaker.service";

@Module({
  imports: [],
  providers: [DynamoDbService, SagemakerService],
  exports: [DynamoDbService, SagemakerService],
})
export class AwsModule {}