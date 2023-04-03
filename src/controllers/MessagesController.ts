import store from '../services/Store';
import WSTransport, {WSTransportEvents} from '../services/WSTransport';
import ChatsController from './ChatsController';

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
}

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }
    const userId = store.getState().user!.id;

    const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
    this.sockets.set(id, wsTransport);
    await wsTransport.connect();
    this.subscribe(wsTransport, id);
    this.fetchOldMessages(id);
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({type: 'get old', content: '0'});
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  onClose(id: number) {
    this.sockets.delete(id);
  }

  private onMessage(id: number, messages: Message | Message[]) {
    const storeKey = `messages.${id}`;
    if (Array.isArray(messages)) {
      store.set(storeKey, messages);
      return;
    }

    const oldMessages = store.getState().messages[id];

    if (!oldMessages) {
      store.set(storeKey, [messages]);
    } else {
      store.set(storeKey, [...oldMessages, messages]);
    }
    ChatsController.getChats();
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (messages: Message | Message[]) => this.onMessage(id, messages));
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

export default new MessagesController();
