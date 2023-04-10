import {ChatsAPI} from '../api/chats-api';
import {ChatModel} from '../api/interfaces/chat-interfaces';
import {router} from '../services/Router';
import store from '../services/Store';
import MessagesController, {Message} from './MessagesController';

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  async getChats() {
    store.set('isChatsLoading', true);
    const res = await this.api.getChats();
    if ( res.status === 200 ) {
      store.set('chats', res.response);
      const chats = res.response;
      chats.forEach(async (chat: ChatModel) => {
        const token = await this.getToken(chat.id);
        if (token) {
          await MessagesController.connect(chat.id, token);
        }
      });
    } else {
      store.set('error', {status: res.status, reason: res.response.reason});
      router.go('/error');
    }
    store.set('isChatsLoading', false);
  }

  async createChat(title: string) {
    const res = await this.api.createChat(title);
    if ( res.status === 200 ) {
      this.getChats();
    } else {
      store.set('error', {status: res.status, reason: res.response.reason});
      router.go('/error');
    }
  }

  async deleteChat(chatId: number) {
    const res = await this.api.deleteChat(chatId);
    if ( res.status === 200 ) {
      store.set('selectedChat', null);
      MessagesController.onClose(chatId);
      const messages = store.getState().messages as Record<number, Message[]>;
      delete messages[chatId];
      this.getChats();
    } else {
      store.set('error', {status: res.status, reason: res.response.reason});
      router.go('/error');
    }
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
