import { Injectable } from "@nestjs/common";
import { CommentRepository } from "src/infrastructure/persistance/repositories/comment.repository";

@Injectable()
export class ReplyToCommentCommand {
  constructor (
    private readonly commentRepository: CommentRepository
  ) {}

  async execute(authenticatedUserId: string, commentId: string, content: string) {
    const comment = await this.commentRepository.findOne(commentId);

    const reply = comment.replyToOtherComment(content, authenticatedUserId);

    return await this.commentRepository.save(reply);
  }
}
