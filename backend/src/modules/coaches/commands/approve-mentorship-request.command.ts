import { Injectable } from "@nestjs/common";
import { Chat } from "src/domain/chat/Chat";
import { ChatRepository } from "src/infrastructure/persistance/repositories/chats.repository";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";
import { StudentRepository } from "src/infrastructure/persistance/repositories/student.repository";

@Injectable()
export class ApproveMentorshipRequestCommand {
  constructor (
    private readonly coachRepository: CoachRepository,
    private readonly chatRepository: ChatRepository,
    private readonly studentRepository: StudentRepository
  ) {}

  async execute(authenticatedCoachId: string, studentId: string) {
    const chat = Chat.createNew({ coach: authenticatedCoachId, student: studentId });
    await this.chatRepository.save(chat);

    const coach = await this.coachRepository.findOne(authenticatedCoachId);
    coach.approveMentorship(studentId, chat.id);
    await this.coachRepository.save(coach);

    const student = await this.studentRepository.findOne(studentId);
    student.joinChatWithCoach(coach.email, chat.id);
    await this.studentRepository.save(student);

    return coach.students.filter(s => s.student === studentId)[0];
  }
}
