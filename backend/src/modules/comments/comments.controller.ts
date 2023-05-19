import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ReplyToCommentCommand } from "./commands/reply-to-comment.command";
import { AuthenticatedUser } from "../auth/decorators/authenticated-user.decorator";

@Controller("comments")
export class CommentsController {
  constructor(
    private readonly replyToCommentCommand: ReplyToCommentCommand
  ) {}

  @Post(":id/reply")
  reply(
    @Body("content") content: string,
    @Param("id") id: string,
    @AuthenticatedUser() authenticatedUser: string
  ) {
    return this.replyToCommentCommand.execute(authenticatedUser, id, content);
  }
}
