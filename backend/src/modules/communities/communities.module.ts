import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { CommunitiesController } from "src/modules/communities/communities.controller";
import { GetAllCommunitiesQuery } from "src/modules/communities/queries/get-all.query";

@Module({
  imports: [InfrastructureModule],
  controllers: [CommunitiesController],
  providers: [GetAllCommunitiesQuery],
})
export class CommunitiesModule {}
