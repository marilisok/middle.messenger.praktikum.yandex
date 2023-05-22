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
    try {
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
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    } finally {
      store.set('isChatsLoading', false);
    }
  }

  async createChat(title: string) {
    try {
      const res = await this.api.createChat(title);
      if ( res.status === 200 ) {
        this.getChats();
      } else {
        store.set('error', {status: res.status, reason: res.response.reason});
        router.go('/error');
      }
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    }
  }

  async deleteChat(chatId: number) {
    try {
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
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    }
  }

  setSelectedChat(chat: ChatModel) {
    store.set('selectedChat', chat);
  }

  async getUsersByChat(id: number) {
    let users;
    try {
      users = await this.api.getUsersByChat(id);
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    }
    return users;
  }

  async addUsersToChat(chatId: number, userId: number) {
    try {
      await this.api.addUsersToChat(chatId, [userId]);
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    }
  }

  async deleteUsersFromChat(chatId: number, userId: number) {
    try {
      await this.api.deleteUsersFromChat(chatId, [userId]);
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    }
  }

  public getToken(id: number) {
    let token;
    try {
      token = this.api.getToken(id);
    } catch (e: any) {
      store.set('error', {reason: e?.reason});
    }
    return token;
  }
}

export default new ChatsController();
