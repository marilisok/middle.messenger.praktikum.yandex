import Block from '../services/Block';
import store, {StoreEvents} from '../services/Store';
import {Indexed} from '../utils/helpers';
import {isEqual} from '../utils/isEqual';

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function(Component: typeof Block<any>) {
    return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState());

        super({...props, ...state});
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({...newState});
          }
          state = newState;
        });
      }
    };
  };
}
