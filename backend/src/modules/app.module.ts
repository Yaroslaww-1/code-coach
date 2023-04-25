import { Module } from "@nestjs/common";
import { CommunitiesModule } from "./communities/communities.module";
import { CoachesModule } from "./coaches/coaches.module";
import { StudentsModule } from "./students/students.module";
import { PostsModule } from "./posts/posts.module";

@Module({
  imports: [CommunitiesModule, CoachesModule, StudentsModule, PostsModule],
})
export class AppModule {}