import Block from './Block';
import {isEqual} from '../utils/isEqual';
import {renderDOM} from '../utils/renderDOM';

export interface RouteProps {
  rootQuery: string;
}

class Route {
  private _pathname: string;
  private _blockClass: Block<object>;
  private _block: Block<object> | null;
  private _props: RouteProps;

  constructor(pathname: string, view: Block<object>, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block?.dispatchComponentDidUnmount();
      this._block = null;
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass;
      renderDOM(this._props.rootQuery, this._block!);
    }
  }
}
export default Route;
