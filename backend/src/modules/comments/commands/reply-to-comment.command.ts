import { Injectable } from "@nestjs/common";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";
import { CommentRepository } from "src/infrastructure/persistance/repositories/comment.repository";
import { StudentRepository } from "src/infrastructure/persistance/repositories/student.repository";

@Injectable()
export class ReplyToCommentCommand {
  constructor (
    private readonly commentRepository: CommentRepository,
    private readonly coachRepository: CoachRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(authenticatedUserId: string, commentId: string, content: string) {
    const user = (await this.coachRepository.findOne(authenticatedUserId)) ||
      (await this.studentRepository.findOne(authenticatedUserId));

    const comment = await this.commentRepository.findOne(commentId);

    const reply = comment.replyToOtherComment(content, user);

    return await this.commentRepository.save(reply);
  }
}
