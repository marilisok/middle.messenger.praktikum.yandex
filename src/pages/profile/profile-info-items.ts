import store from '../../services/Store';
import {FieldsName} from '../../utils/FieldsName';
import {ProfileInfoItem} from './components/profile-info-item/profile-info-item';

export const profileInfoItems = () => {
  const user = store.getState().user;
  const email = new ProfileInfoItem({
    text: 'Почта',
    value: user?.email || '',
    field: FieldsName.EMAIL,
  });

  const login = new ProfileInfoItem({
    text: 'Логин',
    value: user?.login || '',
    field: FieldsName.LOGIN,
  });

  const name = new ProfileInfoItem({
    text: 'Имя',
    value: user?.first_name || '',
    field: FieldsName.FIRST_NAME,
  });

  const surname = new ProfileInfoItem({
    text: 'Фамилия',
    value: user?.second_name || '',
    field: FieldsName.SECOND_NAME,
  });

  const displayName = new ProfileInfoItem({
    text: 'Имя в чате',
    value: user?.display_name || '',
    field: FieldsName.DISPLAY_NAME,
  });

  const phone = new ProfileInfoItem({
    text: 'Телефон',
    value: user?.phone || '',
    field: FieldsName.PHONE,
  });

  return [email, login, name, surname, displayName, phone];
};
