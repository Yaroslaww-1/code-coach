import { Module } from "@nestjs/common";
import { SeedModule } from "./persistance/seeders/seed.module";
import { AwsModule } from "./aws/aws.module";

@Module({
  imports: [AwsModule, SeedModule],
  providers: [],
  exports: [AwsModule],
})
export class InfrastructureModule {}