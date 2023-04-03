import Block from '../../../../services/Block';
import template from './message.hbs';

interface MessageProps {
  content: string;
  time: string;
  className: string;
}

export class MessageItem extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add(this.props.className);
  }

  render() {
    return this.compile(template, this.props);
  }
}
