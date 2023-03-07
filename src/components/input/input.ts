import Block from '../../utils/Block';
import template from './input.hbs';
export interface InputProps {
  attr: {
    placeholder: string;
    class: string;
    type: string;
    name?: string;
    value?: string;
  },
  events?: {
    blur?: () => void,
    focus?: () => void,
  };
}
export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('input', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}


