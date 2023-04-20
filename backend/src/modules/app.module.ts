import { Module } from "@nestjs/common";
import { CommunitiesModule } from "./communities/communities.module";
import { CoachesModule } from "./coaches/coaches.module";

@Module({
  imports: [CommunitiesModule, CoachesModule],
})
export class AppModule {}