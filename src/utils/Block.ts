import {EventBus} from './EventBus';
import {nanoid} from 'nanoid';

class Block<Props extends object> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);
  protected props: Props;
  public children: Record<string, Block<Props>> = {};
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: any; };

  /** JSDoc
   * @param {string} tagName
   * @param {Object} propsWithChildren
   *
   * @return {void}
   */
  constructor(tagName = 'div', propsWithChildren: Record<string, any> = {}) {
    const eventBus = new EventBus();

    const {props, children} = this._getChildrenAndProps(propsWithChildren);


    this._meta = {
      tagName,
      props,
    };

    this.children = this._makePropsProxy( children) as Record<string, Block<Props>>;
    this.props = this._makePropsProxy(props) as Props;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps<T>(childrenAndProps: Record<string, T>) {
    const props: Record<string, T> = {};
    const children: Record<string, T> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) ) {
        value.forEach((val) => {
          if (val instanceof Block) {
            children[key] = value;
          } else {
            props[key] = value;
          }
        });
        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {props, children};
  }

  _addEvents() {
    const {events = {}} = this.props as { events: Record<string, () =>void> };

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  _removeEvents() {
    const {events} = this.props as Record<string, () => void>;
    if (events) {
      Object.entries(events).forEach(([event, listener]) => {
        this._element?.removeEventListener(event, listener);
      });
    }
  }

  _addAttributes() {
    const {attr = {}} = this.props as Record<string, string>;

    if ( attr ) {
      Object.entries(attr).forEach(([key, value]) => {
        this._element!.setAttribute(key, value as string);
      });
    }
  }

  removeAttribute(attrName: string) {
    this._element!.removeAttribute(attrName);
  }


  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const {tagName} = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }


  protected init() {
    return;
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
    return true;
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  setProps = (nextProps: Record<string, any>) => {
    if (!nextProps) {
      return;
    }

    const oldValue = (this.props);

    const {children, props} = this._getChildrenAndProps(nextProps);

    if (Object.values(children).length) {
      Object.assign( this.children, children );
    }

    if (Object.values(props).length) {
      Object.assign( this.props, props );
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();
    this._removeEvents();

    this._element!.innerHTML = '';

    this._element!.append(fragment);

    this._addEvents();
    this._addAttributes();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = {...context};

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.values(this.children).forEach((child) => {
      const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
      if (!stub) {
        return;
      }
      if (Array.isArray(child)) {
        child.forEach((item, index) => {
          if (index === child.length - 1) {
            stub.replaceWith(item.getContent());
          } else {
            stub.before(item.getContent());
          }
        });
      } else {
        stub.replaceWith(child.getContent()!);
      }
    });
    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy<T>(props: Record<string, T>) {
    return new Proxy( props, {

      get( target, prop: string ) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind( target ) : value;
      },

      set( target, prop: string, value ) {
        if (target[prop] !== value) {
          target[prop] = value;
        }
        return true;
      },

      deleteProperty() {
        throw new Error( 'Нет доступа' );
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }

  get styleDisplay() {
    return this.getContent()!.style.display;
  }
}

export default Block;
