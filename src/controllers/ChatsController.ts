import {ChatsAPI} from '../api/chats-api';
import {ChatModel} from '../api/interfaces/chat-interfaces';
import store from '../services/Store';
import MessagesController, {Message} from './MessagesController';

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  async getChats() {
    store.set('isChatsLoading', true);
    const chats = await this.api.getChats().then( ( res: XMLHttpRequest ) => {
      if ( res.status === 200 ) {
        store.set('chats', res.response);
        store.set('isChatsLoading', false);
        return res.response;
      }
      return [];
    });
    chats.forEach(async (chat: ChatModel) => {
      const token = await this.getToken(chat.id);
      if (token) {
        await MessagesController.connect(chat.id, token);
      }
    });
  }

  async createChat(title: string) {
    await this.api.createChat(title).then((res: XMLHttpRequest) => {
      if ( res.status === 200 ) {
        this.getChats();
      }
    });
  }

  async deleteChat(chatId: number) {
    await this.api.deleteChat(chatId).then((res: XMLHttpRequest) => {
      if ( res.status === 200 ) {
        store.set('selectedChat', null);
        MessagesController.onClose(chatId);
        const messages = store.getState().messages as Record<number, Message[]>;
        delete messages[chatId];
        this.getChats();
      }
    });
  }

  setSelectedChat(chat: ChatModel) {
    store.set('selectedChat', chat);
  }

  async getUsersByChat(id: number) {
    return await this.api.getUsersByChat(id);
  }

  async addUsersToChat(chatId: number, userId: number) {
    await this.api.addUsersToChat(chatId, [userId]);
  }

  async deleteUsersFromChat(chatId: number, userId: number) {
    await this.api.deleteUsersFromChat(chatId, [userId]);
  }

  public getToken(id: number) {
    return this.api.getToken(id);
  }
}

export default new ChatsController();
