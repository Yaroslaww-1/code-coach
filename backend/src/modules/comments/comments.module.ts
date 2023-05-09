import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { CommentsController } from "./comments.controller";
import { ReplyToCommentCommand } from "./commands/reply-to-comment.command";

@Module({
  imports: [InfrastructureModule],
  controllers: [CommentsController],
  providers: [ReplyToCommentCommand],
})
export class CommentsModule {}
