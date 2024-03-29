import { nanoid } from "nanoid";
import { ValueObject } from "../lib/ValueObject";
import { RemoveMethods } from "../lib/typings";
import { MessageId } from "./MessageId";
import { StudentEmail } from "../user/student/StudentEmail";
import { CoachEmail } from "../user/coach/CoachEmail";
import { ChatId } from "./ChatId";

export class Message extends ValueObject<Message> {
  public id: MessageId;
  public content: string;
  public chat: ChatId;
  public createdAt: Date;
  public author: CoachEmail | StudentEmail;

  public static createNew(message: Omit<RemoveMethods<Message>, "id">) {
    return new Message({ ...message, id: nanoid(8) })
  }
}