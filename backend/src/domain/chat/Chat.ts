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

  public static createNew(chat: Omit<RemoveMethods<Chat>, "id">) {
    return new Chat({ ...chat, id: new ChatId(nanoid(8)) })
  }

  public send(message: string, userId: CoachEmail | StudentEmail) {
    // TODO: check
    return Message.createNew({
      content: message,
      author: userId,
      createdAt: new Date(),
      chat: this.id,
    })
    // TODO: new MessageSent()
  }
}