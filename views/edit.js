import { editCar, getCarById } from '../src/data.js';
import { html } from './../node_modules/lit-html/lit-html.js';

let editTemplate = (car, onSubmitEdit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmitEdit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value="${car.brand}">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value="${car.model}">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value="${car.description}">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value="${car.year}">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${car.imageUrl}">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value="${car.price}">

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`

export async function editPage(ctx) {
    let carId = ctx.params.id;
    let car = await getCarById(carId);

    ctx.render(editTemplate(car, onSubmitEdit));

    async function onSubmitEdit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let { brand, model, description, year, imageUrl, price } = Object.fromEntries(formData);

        year = Number(year);
        price = Number(price);

        if (!brand || !model || !description || !year || !imageUrl || !price) return alert('All fields are required!');

        let carEdit = {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        }

        try {
            await editCar(carId, carEdit);
            ctx.page.redirect(`/details/${carId}`);

        } catch (error) {
            return alert(error.message);
        }

    }
}