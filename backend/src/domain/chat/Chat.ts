import { nanoid } from "nanoid";
import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { ChatId } from "./ChatId";
import { Message } from "./Message";
import { CoachEmail } from "../user/coach/CoachEmail";
import { StudentEmail } from "../user/student/StudentEmail";
import { MessageSent } from "./events/MessageSent.event";

export class Chat extends Entity<Chat> {
  public id: ChatId;
  public coach: CoachEmail;
  public student: StudentEmail;

  public static createNew(chat: Omit<RemoveMethods<Chat>, "id" | "messages">) {
    return new Chat({ ...chat, id: nanoid(8) })
  }

  public static initialize(chat: RemoveMethods<Chat>) {
    return new Chat({ ...chat })
  }

  public send(messageContent: string, userId: CoachEmail | StudentEmail) {
    const message = Message.createNew({
      content: messageContent,
      author: userId,
      createdAt: new Date(),
      chat: this.id,
    });

    this.events.push(new MessageSent(message));
  }
}