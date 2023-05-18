export class Ws {
  private _sendMessage: (message: string) => void = () => {};

  initialize(sendMessage: (message: string) => void) {
    this._sendMessage = sendMessage;
  }

  async sendMessage(chatId: string, message: string, author: string): Promise<void> {
    const event = "chats/messages";
    const data = { chatId, message, author };
    this._sendMessage(JSON.stringify({ event, data }));
  }
}

const ws = new Ws();

export default ws;
