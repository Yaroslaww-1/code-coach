import { Chat } from "src/domain/chat/Chat";
import Coaches from "./coaches";
import Students from "./students";

class Chats {
  public readonly data: Chat[];

  constructor() {
    const students = Students.data;
    const coaches = Coaches.data;

    const chat1 = Chat.createNew({ student: students[0].email, coach: coaches[0].email });
    const chat2 = Chat.createNew({ student: students[1].email, coach: coaches[1].email });

    chat1.send("Hey!", chat1.student);
    const now = new Date().getTime();
    while (new Date().getTime() < now + 1) {}
    chat1.send("Hello!", chat1.coach);

    coaches[0].applyForMentorship(students[0].email);
    coaches[0].applyForMentorship(students[1].email);
    coaches[0].approveMentorship(students[0].email, chat1.id);
    students[0].joinChatWithCoach(coaches[0].email, chat1.id);

    this.data = [chat1, chat2];
  }
}

export default new Chats();
