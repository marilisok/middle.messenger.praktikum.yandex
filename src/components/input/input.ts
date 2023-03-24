import Block from '../../services/Block';
import template from './input.hbs';
export interface InputProps {
  attr: {
    placeholder: string;
    class: string;
    type: string;
    name?: string;
    value?: string;
  };
  events?: {
    blur?: () => void;
    focus?: () => void;
  };
}
export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('input', props);
  }

  get value() {
    return this.element!.value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
