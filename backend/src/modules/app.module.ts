import { Module } from "@nestjs/common";
import { CommunitiesModule } from "./communities.module";

@Module({
  imports: [CommunitiesModule],
})
export class AppModule {}