import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ReplyToCommentCommand } from "./commands/reply-to-comment.command";
import { Identity } from "../auth/identity";

@Controller("comments")
export class CommentsController {
  constructor(
    private readonly replyToCommentCommand: ReplyToCommentCommand
  ) {}

  @Post(":id/reply")
  reply(@Body("content") content: string, @Param("id") id: string) {
    return this.replyToCommentCommand.execute(Identity.STUDENT, id, content);
  }
}
