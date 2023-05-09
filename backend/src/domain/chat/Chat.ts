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
  public member1: CoachEmail | StudentEmail;
  public member2: CoachEmail | StudentEmail;

  public static createNew(chat: Omit<RemoveMethods<Chat>, "id" | "messages">) {
    return new Chat({ ...chat, id: nanoid(8) })
  }

  public send(messageContent: string, userId: CoachEmail | StudentEmail) {
    // TODO: check whether userId is member1/2
    const message = Message.createNew({
      content: messageContent,
      author: userId,
      createdAt: new Date(),
      chat: this.id,
    });

    this.events.push(new MessageSent(message));
  }
}