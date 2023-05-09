import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { PostsController } from "./posts.controller";
import { GetAllPostsQuery } from "./queries/get-all.query";
import { GetCommentsByPostQuery } from "./queries/get-comments-by-post.query";
import { GetByCommunityIdPostsQuery } from "./queries/get-by-community-id.query";
import { GetByIdPostQuery } from "./queries/get-by-id.query";
import { ReplyToPostCommand } from "./commands/reply-to-post.command";

@Module({
  imports: [InfrastructureModule],
  controllers: [PostsController],
  providers: [
    GetAllPostsQuery,
    GetCommentsByPostQuery,
    GetByCommunityIdPostsQuery,
    GetByIdPostQuery,
    ReplyToPostCommand,
  ],
})
export class PostsModule {}
