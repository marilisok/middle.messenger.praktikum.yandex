import template from './change-password.hbs';
import Block from '../../../../services/Block';
import {InputContainer} from '../../../../components/input/inputContainer';
import {FieldsName} from '../../../../utils/FieldsName';
import {Button} from '../../../../components/button/button';
import {Form} from '../../../../components/form/form';
import {router} from '../../../../services/Router';

export class ChangePassword extends Block<any> {
  constructor() {
    super('div');
  }

  init() {
    const oldPassword = new InputContainer({
      text: 'Старый пароль',
      isProfileMode: true,
      className: 'color-input-base',
      placeholder: 'Старый пароль',
      type: 'password',
      name: FieldsName.OLD_PASSWORD,
    });
    const newPassword = new InputContainer({
      text: 'Новый пароль',
      isProfileMode: true,
      className: 'color-input-base',
      placeholder: 'Новый пароль',
      type: 'password',
      name: FieldsName.NEW_PASSWORD,
    });
    const repeatPassword = new InputContainer({
      text: 'Повторите новый пароль',
      isProfileMode: true,
      className: 'color-input-base',
      placeholder: 'Повторите новый пароль',
      type: 'password',
      name: FieldsName.PASSWORD_REPEAT,
    });

    const saveButton = new Button({
      label: 'Сохранить',
      className: 'primary',
      attr: {
        type: 'submit',
      },
    });

    const form = new Form({
      inputs: [oldPassword, newPassword, repeatPassword],
      buttons: [saveButton],
      events: {
        submit: (event) => {
          event.preventDefault();
          const formObj = form.getForm();
          const isFormInValid = form.isFormInValid();
          if (!isFormInValid) {
            router.go('/settings');
          }
        },
      },
    });

    this.children.form = form;
  }

  render() {
    return this.compile(template, this.props);
  }
}
