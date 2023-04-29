import { nanoid } from "nanoid";
import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { ChatId } from "./ChatId";
import { Message } from "./Message";
import { CoachEmail } from "../coach/CoachEmail";
import { StudentEmail } from "../student/StudentEmail";

export class Chat extends Entity<Chat> {
  public id: ChatId;
  public member1: CoachEmail | StudentEmail;
  public member2: CoachEmail | StudentEmail;

  public messages: Message[];

  public static createNew(chat: Omit<RemoveMethods<Chat>, "id" | "messages">) {
    return new Chat({ ...chat, id: nanoid(8), messages: [] })
  }

  public send(message: string, userId: CoachEmail | StudentEmail) {
    // TODO: check whether userId is member1/2
    this.messages.push(Message.createNew({
      content: message,
      author: userId,
      createdAt: new Date(),
      chat: this.id,
    }))
    // TODO: new MessageSentEvent()
  }
}