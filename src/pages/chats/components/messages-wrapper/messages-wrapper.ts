import Block from '../../../../services/Block';
import {MessageItem} from '../message/message';
import template from './messages-wrapper.hbs';

interface MessageWrapperProps {
  messageItems: MessageItem[];
}

export class MessageWrapper extends Block<MessageWrapperProps> {
  constructor(props: MessageWrapperProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
