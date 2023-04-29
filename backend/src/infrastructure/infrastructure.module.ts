import { Module } from "@nestjs/common";
import { SeedModule } from "./persistance/seeders/seed.module";
import { AwsModule } from "./aws/aws.module";
import { RepositoriesModule } from "./persistance/repositories/repositories.module";

@Module({
  imports: [AwsModule, RepositoriesModule, SeedModule],
  providers: [],
  exports: [AwsModule],
})
export class InfrastructureModule {}