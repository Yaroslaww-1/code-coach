import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { AwsModule } from "src/infrastructure/aws/aws.module";
import { RepositoriesModule } from "../repositories/repositories.module";

@Module({
  imports: [AwsModule, RepositoriesModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}