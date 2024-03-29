import { Module } from "@nestjs/common";
import { CommunitiesModule } from "./communities/communities.module";
import { CoachesModule } from "./coaches/coaches.module";
import { StudentsModule } from "./students/students.module";
import { PostsModule } from "./posts/posts.module";
import { FairsModule } from "./fairs/fairs.module";
import { ChatsModule } from "./chats/chats.module";
import { AuthModule } from "./auth/auth.module";
import { CommentsModule } from "./comments/comments.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    CommunitiesModule,
    CoachesModule,
    StudentsModule,
    PostsModule,
    FairsModule,
    ChatsModule,
    AuthModule,
    CommentsModule,
    UsersModule,
    HealthModule,
  ],
})
export class AppModule {}