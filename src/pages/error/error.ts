import {ErrorBase} from '../../api/interfaces/error-interface';
import {connect} from '../../hocs/connect';
import Block from '../../services/Block';
import template from './error.hbs';

class ErrorPageBase extends Block<any> {
  constructor(props?: ErrorBase) {
    super('div', props);
  }

  init() {
    this.element?.classList.add('flex-wrapper');
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const ErrorPage = connect((state) => ({
  status: state.error?.status || '400',
  reason: state.error?.reason || 'Не туда попали',
}))(ErrorPageBase);
