import {User} from '../api/interfaces/auth-interfaces';
import {set} from '../utils/helpers';
import {EventBus} from './EventBus';

export interface State{
    user?: User;
}

export enum StoreEvents{
    Updated = 'updated'
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
