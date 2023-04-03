import {BaseAPI} from './base-api';

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  getChats() {
    return this.http.get('/');
  }

  createChat(title: string) {
    return this.http.post('/', {data: {title}});
  }

  deleteChat(chatId: number) {
    return this.http.delete('/', {data: {chatId}});
  }

  getUsersByChat(id: number) {
    return this.http.get(`/${id}/users`);
  }

  addUsersToChat(chatId: number, users: number[]) {
    return this.http.put('/users', {data: {chatId, users}});
  }

  deleteUsersFromChat(chatId: number, users: number[]) {
    return this.http.delete('/users', {data: {chatId, users}});
  }

  async getToken(id: number): Promise<string> {
    const res = await this.http.post(`/token/${id}`);
    return res.response?.token;
  }
}
