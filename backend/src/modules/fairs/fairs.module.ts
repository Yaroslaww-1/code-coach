import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { FairsController } from "./fairs.controller";
import { GetByCommunityFairQuery } from "./queries/get-by-community.query";
import { LeaveFairCommand } from "./commands/leave-fair.command";
import { JoinFairCommand } from "./commands/join-fair.command";

@Module({
  imports: [InfrastructureModule],
  controllers: [FairsController],
  providers: [GetByCommunityFairQuery, JoinFairCommand, LeaveFairCommand],
})
export class FairsModule {}
