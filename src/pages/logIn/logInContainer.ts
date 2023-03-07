import {Button} from '../../components/button/button';
import {Form} from '../../components/form/form';
import {InputContainer} from '../../components/input/inputContainer';
import {LogInPage} from './logIn';
import {FieldsName} from '../../utils/FieldsName';

export const logInContainer = () => {
  const loginInput = new InputContainer({
    className: 'form-input',
    placeholder: 'Логин',
    type: 'text',
    name: FieldsName.LOGIN,
  });

  const passwordInput = new InputContainer({
    className: 'form-input',
    placeholder: 'Пароль',
    type: 'password',
    name: FieldsName.PASSWORD,
  });

  const signInButton = new Button({
    label: 'Авторизоваться',
    className: 'primary',
    attr: {
      type: 'submit',
    },
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
