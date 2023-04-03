import {User} from './auth-interfaces';

export interface MessageModel{
  user: User;
  time: string;
  content: string;
}

export interface ChatModel{
  avatar: string | null;
  created_by: number;
  id: number;
  last_message: MessageModel | null;
  title: string;
  unread_count: number;
}

export interface Token {
  token: string;
}
