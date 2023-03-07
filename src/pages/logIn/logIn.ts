import {Form} from '../../components/form/form';
import Block from '../../utils/Block';
import template from './logIn.hbs';

interface LogInPageProps {
  form: Form;
  title: string;
}

export class LogInPage extends Block<LogInPageProps> {
  constructor(props: LogInPageProps) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('flex-wrapper');
  }

  render() {
    return this.compile(template, this.props);
  }
}
