import main from './src/pages/main/main.hbs';
import signIn from './src/pages/signIn/signIn.hbs';
import logIn from './src/pages/logIn/logIn.hbs';
import profile from './src/pages/profile/profile.hbs';
import chats from './src/pages/chats/chats.hbs';
import clientError from './src/pages/client-error/client-error.hbs';
import serverError from './src/pages/server-error/server-error.hbs';
import './src/components/button';
import './src/components/input';
import './src/components/avatar';
import './src/pages/profile/components/profile-info-item';
import './src/pages/chats/components/chat-item';
import './src/pages/profile/components/change-password';
import avatar from './static/images/avatar.png';

const ROUTES = {
    'main': main,
    'signIn': signIn,
    'logIn': logIn,
    'profile': profile,
    'chats': chats,
    'clientError': clientError,
    'serverError': serverError
};

const render = (html, props = {}) => {
    const app = document.querySelector('#app');
    app.innerHTML = html(props);
};

window.goToPage = (name, props) => {
    const page = ROUTES[name];
    if(name==='profile' || name==='chats'){
        props={
            ...props,
            src: avatar
        };
    }
    render(page, props);
    
};

document.addEventListener('DOMContentLoaded', () => render(main));
