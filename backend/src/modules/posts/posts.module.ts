import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { PostsController } from "./posts.controller";
import { GetAllPostsQuery } from "./queries/get-all.query";

@Module({
  imports: [InfrastructureModule],
  controllers: [PostsController],
  providers: [GetAllPostsQuery],
})
export class PostsModule {}
