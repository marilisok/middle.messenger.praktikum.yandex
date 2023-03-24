import Block from '../../../../services/Block';
import template from './message.hbs';

interface MessageProps {
  text: string;
  time: string;
  className: string;
}

export class Message extends Block<MessageProps> {
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
