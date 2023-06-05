/**
 * ideas by the author
 * - create a function for the overlays to open and close and use the callback of elements
 * - turn all the dom elements into variables
 * 
 */

//@ts-check

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

/**
 * Page that will display books and increment as more books show
 * @type {number} 
 */
let page = 1;

/**
 * Amount of books to be displayed on each page
 * @type {Array}
 */
let matches = books;

//All DOM elements
const dataListItems = document.querySelector('[data-list-items]');
const dataListButton = document.querySelector('[data-list-button]');
const dataListClose = document.querySelector('[data-list-close]');
const dataListActive = document.querySelector('[data-list-active]');
const dataListMessage = document.querySelector('[data-list-message]');
const dataListBlur = document.querySelector('[data-list-blur]');
const dataListImage = document.querySelector('[data-list-image]');
const dataListTitle = document.querySelector('[data-list-title]');
const dataListSubtitle = document.querySelector('[data-list-subtitle]');
const dataListDescription = document.querySelector('[data-list-description]');
const dataSearchGenres = document.querySelector('[data-search-genres]');
const dataSearchAuthors = document.querySelector('[data-search-authors]');
const dataSettingsTheme = document.querySelector('[data-settings-theme]');
const dataSearchCancel = document.querySelector('[data-search-cancel]');
const dataSearchOverlay = document.querySelector('[data-search-overlay]');
const dataSearchTitle = document.querySelector('[data-search-title]');
const dataSearchForm = document.querySelector('[data-search-form]');
const dataSettingsCancel = document.querySelector('[data-settings-cancel]');
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]');
const dataSettingsForm = document.querySelector('[data-settings-form]');
const dataHeaderSearch = document.querySelector('[data-header-search]');
const dataHeaderSettings = document.querySelector('[data-header-settings]');


const starting = document.createDocumentFragment();

for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement('button');
    //@ts-ignore
    element.classList = 'preview'; //initially returned 'cannot assign to 'classList' because it is a read-only property'; added ts-ignore
    element.setAttribute('data-preview', id);

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    starting.appendChild(element)
}

dataListItems.appendChild(starting);

const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
};

dataSearchGenres.appendChild(genreHtml);

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

dataSearchAuthors.appendChild(authorsHtml)

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    dataSettingsTheme.value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    dataSettingsTheme.value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

dataListButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0;

dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

//Logic for event listeners

/**
 * Function to close overlay boxes
 * @returns {boolean}
 */
const openFalse = (item) => {
    return item.open = false;
};

/**
 * Function to open overlay boxes
 * @returns {boolean}
 */
const openTrue = (item) => {
    return item.open = true;
};

dataSearchCancel.addEventListener('click', () => {
   openFalse(dataSearchOverlay);
});

dataSettingsCancel.addEventListener('click', () => {
   openFalse(dataSettingsOverlay);
});

dataHeaderSearch.addEventListener('click', () => {
    openTrue(dataSearchOverlay); 
    dataSearchTitle.focus();
});

dataHeaderSettings.addEventListener('click', () => {
    openTrue(dataSettingsOverlay);
});

dataListClose.addEventListener('click', () => {
    openFalse(dataListActive);
});

dataSettingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    openFalse(dataSettingsOverlay);
})

dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
        let genreMatch = filters.genre === 'any';

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true };
        };

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book);
        };
    };

    page = 1;
    matches = result;

    if (result.length < 1) {
        dataListMessage.classList.add('list__message_show');
    } else {
        dataListMessage.classList.remove('list__message_show');
    };

    dataListItems.innerHTML = '';
    const newItems = document.createDocumentFragment();

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

        newItems.appendChild(element);
    };

    dataListItems.appendChild(newItems);
    dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;

    dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;

    window.scrollTo({top: 0, behavior: 'smooth'});
    openFalse(dataSearchOverlay);
});

dataListButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

        fragment.appendChild(element);
    };

    dataListItems.appendChild(fragment);
    page += 1;
});

dataListItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            let result = null;
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook;
            } 
        
            active = result;
        }
    }
    
    if (active) {
        dataListActive.open = true;
        dataListBlur.src = active.image;
        dataListImage.src = active.image;
        dataListTitle.innerText = active.title;
        dataListSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        dataListDescription.innerText = active.description;
    }
})