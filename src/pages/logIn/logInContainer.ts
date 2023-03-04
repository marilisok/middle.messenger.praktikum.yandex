import {Button} from '../../components/button/button';
import {Form} from '../../components/form/form';
import {Input} from '../../components/input/input';
import {LogInPage} from './logIn';
import {FieldsName} from '../../utils/FieldsName';

export const logInContainer = () => {
  const loginInput = new Input({
    className: 'form-input',
    placeholder: 'Логин',
    type: 'text',
    name: FieldsName.LOGIN,
  });

  const passwordInput = new Input({
    className: 'form-input',
    placeholder: 'Пароль',
    type: 'password',
    name: FieldsName.PASSWORD,
  });

  const signInButton = new Button({
    label: 'Авторизоваться',
    className: 'primary',
    type: 'submit',
  });

  const logInButton = new Button({
    label: 'Нет аккаунта?',
    className: 'link',
    events: {
      click: () => window.location.replace('signIn'),
    },
  });

  const form = new Form({
    inputs: [loginInput, passwordInput],
    buttons: [signInButton, logInButton],
    events: {
      submit: (event) => {
        event.preventDefault();
        const formObj = form.getForm();
        console.log(formObj);
        const isFormInValid = form.isFormInValid();
        if (!isFormInValid) {
          window.location.replace('chats');
        }
      },
    },
  });

  const logIn = new LogInPage({
    form,
    title: 'Вход',
  });
  return logIn;
};
