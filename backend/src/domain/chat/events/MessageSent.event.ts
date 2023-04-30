import { Message } from "../Message";

export class MessageSent {
  constructor(
    public readonly message: Message,
  ) {}
}