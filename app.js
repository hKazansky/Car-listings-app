import page from './node_modules/page/page.mjs'
import { render } from './node_modules/lit-html/lit-html.js';
import { logout } from './src/api.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';
import { searchPage } from './views/search.js';

userNavigation();
const main = document.getElementById('site-content')

page('/home', contextDecorator, homePage);
page('/index.html', contextDecorator, homePage);
page('/', contextDecorator, homePage);
page('/login', contextDecorator, loginPage);
page('/register', contextDecorator, registerPage)
page('/catalog', contextDecorator, catalogPage);
page('/details/:id', contextDecorator, detailsPage);
page('/create', contextDecorator, createPage);
page('/edit/:id', contextDecorator, editPage);
page('/profile', contextDecorator, profilePage);
page('/search', contextDecorator, searchPage);

page.start();

function contextDecorator(ctx, next) {
    ctx.render = (content) => render(content, main)
    ctx.userNavigation = userNavigation

    next();
}

function userNavigation() {
    const username = sessionStorage.getItem('username');

    if (username !== null) {
        const profile = document.getElementById('profile');
        const guest = document.getElementById('guest');
        profile.children[0].textContent = `Welcome, ${username}`;
        [...profile.children].forEach(x => x.style.display = 'block');
        [...guest.children].forEach(x => x.style.display = 'none');


        profile.children[3].addEventListener('click', logoutPage);
    } else {
        [...profile.children].forEach(x => x.style.display = 'none');
        [...guest.children].forEach(x => x.style.display = 'block');
    }
}

async function logoutPage() {
    await logout();

    userNavigation();
    page.redirect('/home')
}
