import { Injectable } from "@nestjs/common";
import { Comment } from "src/domain/comment/Comment";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";
import { CommentRepository } from "src/infrastructure/persistance/repositories/comment.repository";
import { StudentRepository } from "src/infrastructure/persistance/repositories/student.repository";

@Injectable()
export class ReplyToPostCommand {
  constructor (
    private readonly commentRepository: CommentRepository,
    private readonly coachRepository: CoachRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(authenticatedUserId: string, postId: string, content: string) {
    const user = (await this.coachRepository.findOne(authenticatedUserId)) ||
      (await this.studentRepository.findOne(authenticatedUserId));

    const reply = Comment.replyToPost(postId, content, user);

    return await this.commentRepository.save(reply);
  }
}
