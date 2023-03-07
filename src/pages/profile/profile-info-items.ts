import {ProfileInfoItem} from './components/profile-info-item/profile-info-item';

export const profileInfoItems = () => {
  const email = new ProfileInfoItem({
    text: 'Почта',
    value: 'email@mail.ru',
  });

  const login = new ProfileInfoItem({
    text: 'Логин',
    value: 'Логин',
  });

  const name = new ProfileInfoItem({
    text: 'Имя',
    value: 'Имя',
  });

  const surname = new ProfileInfoItem({
    text: 'Фамилия',
    value: 'Фамилия',
  });

  const displayName = new ProfileInfoItem({
    text: 'Имя в чате',
    value: 'Имя в чате',
  });

  const phone = new ProfileInfoItem({
    text: 'Телефон',
    value: 'Телефон',
  });

  return [email, login, name, surname, displayName, phone];
};
