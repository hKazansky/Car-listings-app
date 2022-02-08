import { register } from '../src/api.js';
import { html } from './../node_modules/lit-html/lit-html.js';

let registerTemplate = (onSubmitRegister) => html`
<section id="register">
    <div class="container">
        <form @submit=${onSubmitRegister} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmitRegister));

    async function onSubmitRegister(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let { username, password, repeatPass } = Object.fromEntries(formData);

        if (!username || !password || !repeatPass) return alert('All fields are required!');

        try {
            await register(username, password, repeatPass);
            ctx.userNavigation();
            ctx.page.redirect('/catalog')
        } catch (error) {
            return alert(error.message)
        }
    }
}
