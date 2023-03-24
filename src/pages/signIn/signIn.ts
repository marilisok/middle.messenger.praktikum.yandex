import Block from '../../services/Block';
import template from './signIn.hbs';
import {Form} from '../../components/form/form';

interface SignInPageProps {
  form: Form;
  title: string;
}

export class SignInPage extends Block<SignInPageProps> {
  constructor(props: SignInPageProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('flex-wrapper');
  }

  show() {
    this.getContent()!.style.display = 'flex';
  }

  render() {
    return this.compile(template, this.props);
  }
}

