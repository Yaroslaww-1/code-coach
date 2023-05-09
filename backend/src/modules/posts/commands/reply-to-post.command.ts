import { Injectable } from "@nestjs/common";
import { Comment } from "src/domain/comment/Comment";
import { CommentRepository } from "src/infrastructure/persistance/repositories/comment.repository";

@Injectable()
export class ReplyToPostCommand {
  constructor (
    private readonly commentRepository: CommentRepository
  ) {}

  async execute(authenticatedUserId: string, postId: string, content: string) {
    const reply = Comment.replyToPost(postId, content, authenticatedUserId);

    return await this.commentRepository.save(reply);
  }
}
