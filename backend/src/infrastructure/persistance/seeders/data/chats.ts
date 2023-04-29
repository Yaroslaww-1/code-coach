import { Chat } from "src/domain/chat/Chat";
import Coaches from "./coaches";
import Students from "./students";

class Chats {
  public readonly data: Chat[];

  constructor() {
    const students = Students.data;
    const coaches = Coaches.data;

    const chat1 = Chat.createNew({ member1: students[0].email, member2: coaches[0].email });
    const chat2 = Chat.createNew({ member1: students[1].email, member2: coaches[1].email });

    chat1.send("Hey!", chat1.member1);
    chat1.send("Hello!", chat1.member2);

    this.data = [chat1, chat2];
  }
}

export default new Chats();
