import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { CoachesSeeder } from "./coaches-seeder";
import { CommunitiesSeeder } from "./communities-seeder";
import { FairsSeeder } from "./fairs-seeder";
import { PostsSeeder } from "./post-seeder";
import { StudentsSeeder } from "./students-seeder";
import { AwsModule } from "src/infrastructure/aws/aws.module";

@Module({
  imports: [AwsModule],
  providers: [CoachesSeeder, CommunitiesSeeder, FairsSeeder, PostsSeeder, StudentsSeeder, SeedService],
  exports: [SeedService],
})
export class SeedModule {}