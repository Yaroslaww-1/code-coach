import { Module } from "@nestjs/common";
import { CommunitiesModule } from "./communities/communities.module";
import { CoachesModule } from "./coaches/coaches.module";
import { StudentsModule } from "./students/students.module";

@Module({
  imports: [CommunitiesModule, CoachesModule, StudentsModule],
})
export class AppModule {}