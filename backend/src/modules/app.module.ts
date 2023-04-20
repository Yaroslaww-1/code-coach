import { Module } from "@nestjs/common";
import { CommunitiesModule } from "./communities.module";
import { CoachesModule } from "./coaches.module";

@Module({
  imports: [CommunitiesModule, CoachesModule],
})
export class AppModule {}