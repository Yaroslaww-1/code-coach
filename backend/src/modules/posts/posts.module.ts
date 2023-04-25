import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { PostsController } from "./posts.controller";
import { GetAllPostsQuery } from "./queries/get-all.query";
import { GetByPostQuery } from "./queries/get-by-post.query";

@Module({
  imports: [InfrastructureModule],
  controllers: [PostsController],
  providers: [GetAllPostsQuery, GetByPostQuery],
})
export class PostsModule {}
