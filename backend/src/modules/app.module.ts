import { Module } from "@nestjs/common";
import { CommunitiesModule } from "./communities/communities.module";
import { CoachesModule } from "./coaches/coaches.module";
import { StudentsModule } from "./students/students.module";
import { PostsModule } from "./posts/posts.module";
import { FairsModule } from "./fairs/fairs.module";
import { ChatsModule } from "./chats/chats.module";

@Module({
  imports: [CommunitiesModule, CoachesModule, StudentsModule, PostsModule, FairsModule, ChatsModule],
})
export class AppModule {}