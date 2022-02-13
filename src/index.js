import './css/styles.css';
import './css/country-list.css';
import './css/country-info.css';
import API from '../src/fetchCountries';
import countryInformationTpl from '../src/countryCard.hbs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryListTpl from '../src/country-list.hbs';

const refs = {
    inputBox: document.querySelector('input#search-box'),
    countryList: document.querySelector('ul.country-list'),
    countryInformation: document.querySelector('div.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.inputBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))


function onInput(e) {
    const searchQuery = e.target.value.trim();

    if (searchQuery === "") {
        clearAll();
        return;
    };

    API.fetchCountries(searchQuery)
        .then(countryList)
        .catch(noSuchCountry)
}

function clearAll() {
    refs.countryList.innerHTML = "";
    refs.countryInformation.innerHTML = "";
}

function countryList(countries) {
    const list = countryListTpl(countries);
    refs.countryList.innerHTML = list;
    refs.countryInformation.innerHTML = "";

    if (countries.length > 10) {
        refs.countryList.innerHTML = "";
        Notify.info("Too many matches found. Please enter a more specific name");
    };
    
    if (countries.length === 1) {
        refs.countryList.innerHTML = "";
        countryInformation(countries);
    };
};

function countryInformation(country) {
    const markup = countryInformationTpl(country);
    refs.countryInformation.innerHTML = markup;
};

function noSuchCountry() {
    refs.countryList.innerHTML = "";
    refs.countryInformation.innerHTML = "";
    Notify.failure("Oops, there is no country with that name");
}















