import { login } from '../src/api.js';
import { html } from './../node_modules/lit-html/lit-html.js';


let loginTemplate = (onSubmitLogin) => html`
        <section id="login">
            <div class="container">
                <form @submit=${onSubmitLogin} id="login-form" action="#" method="post">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>
        
                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">
        
                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.
                    </p>
                </div>
            </div>
        </section>`

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmitLogin));

    async function onSubmitLogin(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let { username, password } = Object.fromEntries(formData);

        if (!username || !password) return alert('All fields are required!');

        try {
            await login(username, password);

            ctx.userNavigation();
            ctx.page.redirect('/catalog')
        } catch (error) {
            return alert(error.message)
        }
    }

}