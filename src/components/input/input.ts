import Block from '../../services/Block';
import template from './input.hbs';
export interface InputProps {
  attr: {
    placeholder?: string;
    class: string;
    type: string;
    name?: string;
    value?: string;
    accept?: string;
  };
  events?: {
    blur?: () => void;
    focus?: () => void;
    keyup?: () => void;
  };
}
export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('input', props);
  }

  get value() {
    return this.element!.value;
  }

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
