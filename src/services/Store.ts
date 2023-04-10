import {User} from '../api/interfaces/auth-interfaces';
import {ChatModel} from '../api/interfaces/chat-interfaces';
import {ErrorBase} from '../api/interfaces/error-interface';
import {Message} from '../controllers/MessagesController';
import {set} from '../utils/helpers';
import {EventBus} from './EventBus';

export interface State {
  chats?: ChatModel[];
  user?: User;
  selectedChat?: ChatModel | null;
  isChatsLoading?: boolean;
  isUserLoading?: boolean;
  messages?: Record<number, Message[]>;
  error?: ErrorBase;
}

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: State = {};

  set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated, this.state);
  }

  getState(): State {
    return this.state;
  }
}

const store = new Store();

export default store;
