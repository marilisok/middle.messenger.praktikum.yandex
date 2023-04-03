import template from './form.hbs';
import Block from '../../services/Block';
import {InputContainer} from '../input/inputContainer';
import {Button} from '../button/button';
import {validationForm} from '../../utils/ValidationForm';

interface FormProps {
  inputs: InputContainer[];
  buttons: Button[];
  events: {
    submit: (event: SubmitEvent) => void;
  };
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super('form', props);
  }

  init() {
    this.element?.classList.add('flex-wrapper');
  }

  isFormInValid() {
    const formObj = this.getForm();
    const divForError = this.element?.querySelector('.validation-error-form');
    for (const [key, value] of Object.entries(formObj)) {
      const result = validationForm(key, value);
      divForError!.textContent = result;
      if (result) {
        return !!result;
      }
    }
  }

  getForm() {
    const inputs = Array.from(this.element!.querySelectorAll('input'));
    const formObj = inputs?.reduce((result, item) => {
      const key = item.name;
      const value = item.value || '';
      result[key] = value;
      return result;
    }, {} as Record<string, string>);
    return formObj;
  }

  render() {
    return this.compile(template, this.props);
  }
}
