import template from './input.hbs';
import Block from '../../utils/Block';
import {validationForm} from '../../utils/ValidationForm';

export interface InputProps {
  placeholder: string;
  className: string;
  type: string;
  name?: string;
  value?: string;
  isProfileMode?: boolean;
  text?: string;
  events?: {
    click: () => void;
  };
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('input-wrapper');
  }

  _addEvents() {
    const input = this.element?.querySelector('input');
    const eventHandler = () => {
      const key = input?.name;
      const value = input?.value || '';
      if (key) {
        const result = validationForm(key, value);
        const divForError = this.element?.querySelector('.validation-error');
        divForError!.textContent = result;
      }
    };

    input?.addEventListener('blur', eventHandler);
    input?.addEventListener('focus', eventHandler);
  }

  render() {
    return this.compile(template, this.props);
  }
}
