import { searchCars } from '../src/data.js';
import { html } from './../node_modules/lit-html/lit-html.js';

let searchTemplate = (allCars = [], onClickSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onClickSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    ${allCars.length > 0 
            ?allCars.map(carTemplate)
            : html`<p class="no-cars"> No results.</p>`}
    </div>
</section>`

let carTemplate = (car) => html`
<div class="listings">

    <!-- Display all records -->
    <div class="listing">
        <div class="preview">
            <img src="${car.imageUrl}">
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`

export async function searchPage (ctx) {
    let year;
    let allCars;

    ctx.render(searchTemplate(allCars, onClickSearch))

    async function onClickSearch(){
    
        year = document.querySelector('input').value;
        allCars = await searchCars(year);

        ctx.render(searchTemplate(allCars));
    }
}
