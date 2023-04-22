import { Module } from "@nestjs/common";
import { DynamoDbService } from "./aws/dynamodb.service";
import { SeedService } from "./persistance/seeders/seed.service";

@Module({
  providers: [DynamoDbService, SeedService],
  exports: [DynamoDbService],
})
export class InfrastructureModule {}