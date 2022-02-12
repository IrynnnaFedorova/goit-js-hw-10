import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';



document.getElementById('search-box');

//'search-box'.addEventListener('submit', promiseGenerator);

const DEBOUNCE_DELAY = 300;
async function fetchCountries(name) {
    const country = [];
    for (let name of names) {
        const countrys = fetch('https://restcountries.herokuapp.com/api/v1/${name.official},${capital},${population},${flags.svg},${languages}').then(succesResponse => {
            if (succesResponse.status != 200) {
                return null;
            }
            else {
                return succesResponse.json();
            }
        },
            failResponse => { return null; });
        country.push(countrys);
    }
    const results = await Promise.all(country);
    return results;
}

