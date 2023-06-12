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

/**
 * All DOM elements
 * @typedef {Object} domElements
 */
const domElements = {
    dataListItems : document.querySelector('[data-list-items]'),
    dataListButton : document.querySelector('[data-list-button]'),
    dataListClose : document.querySelector('[data-list-close]'),
    dataListActive : document.querySelector('[data-list-active]'),
    dataListMessage : document.querySelector('[data-list-message]'),
    dataListBlur : document.querySelector('[data-list-blur]'),
    dataListImage : document.querySelector('[data-list-image]'),
    dataListTitle : document.querySelector('[data-list-title]'),
    dataListSubtitle : document.querySelector('[data-list-subtitle]'),
    dataListDescription : document.querySelector('[data-list-description]'),
    dataSearchGenres : document.querySelector('[data-search-genres]'),
    dataSearchAuthors : document.querySelector('[data-search-authors]'),
    dataSettingsTheme : document.querySelector('[data-settings-theme]'),
    dataSearchCancel : document.querySelector('[data-search-cancel]'),
    dataSearchOverlay : document.querySelector('[data-search-overlay]'),
    dataSearchTitle : document.querySelector('[data-search-title]'),
    dataSearchForm : document.querySelector('[data-search-form]'),
    dataSettingsCancel : document.querySelector('[data-settings-cancel]'),
    dataSettingsOverlay : document.querySelector('[data-settings-overlay]'),
    dataSettingsForm : document.querySelector('[data-settings-form]'),
    dataHeaderSearch : document.querySelector('[data-header-search]'),
    dataHeaderSettings : document.querySelector('[data-header-settings]')
}

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

// @ts-ignore
domElements.dataListItems.appendChild(starting);

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

// @ts-ignore
domElements.dataSearchGenres.appendChild(genreHtml);

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

// @ts-ignore
domElements.dataSearchAuthors.appendChild(authorsHtml)

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // @ts-ignore
    domElements.dataSettingsTheme.value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    // @ts-ignore
    domElements.dataSettingsTheme.value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

// @ts-ignore
domElements.dataListButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
// @ts-ignore
domElements.dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0;

// @ts-ignore
domElements.dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

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


// @ts-ignore
domElements.dataSearchCancel.addEventListener('click', () => {
   openFalse(domElements.dataSearchOverlay);
});

// @ts-ignore
domElements.dataSettingsCancel.addEventListener('click', () => {
   openFalse(domElements.dataSettingsOverlay);
});

// @ts-ignore
domElements.dataHeaderSearch.addEventListener('click', () => {
    openTrue(domElements.dataSearchOverlay); 
    // @ts-ignore
    domElements.dataSearchTitle.focus();
});

// @ts-ignore
domElements.dataHeaderSettings.addEventListener('click', () => {
    openTrue(domElements.dataSettingsOverlay);
});

// @ts-ignore
domElements.dataListClose.addEventListener('click', () => {
    openFalse(domElements.dataListActive);
});

// @ts-ignore
domElements.dataSettingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    openFalse(domElements.dataSettingsOverlay);
})

// @ts-ignore
domElements.dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // @ts-ignore
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
            // @ts-ignore
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
        // @ts-ignore
        domElements.dataListMessage.classList.add('list__message_show');
    } else {
        // @ts-ignore
        domElements.dataListMessage.classList.remove('list__message_show');
    };

    // @ts-ignore
    domElements.dataListItems.innerHTML = '';
    const newItems = document.createDocumentFragment();

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button');
                // @ts-ignore
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

    // @ts-ignore
    domElements.dataListItems.appendChild(newItems);
    // @ts-ignore
    domElements.dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;

    // @ts-ignore
    domElements.dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;

    window.scrollTo({top: 0, behavior: 'smooth'});
    openFalse(domElements.dataSearchOverlay);
});

// @ts-ignore
domElements.dataListButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button');
                // @ts-ignore
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

    // @ts-ignore
    domElements.dataListItems.appendChild(fragment);
    page += 1;
});

// @ts-ignore
domElements.dataListItems.addEventListener('click', (event) => {
    // @ts-ignore
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
                // @ts-ignore
                domElements.dataListActive.open = true;
                // @ts-ignore
                domElements.dataListBlur.src = active.image;
                // @ts-ignore
                domElements.dataListImage.src = active.image;
                // @ts-ignore
                domElements.dataListTitle.innerText = active.title;
                // @ts-ignore
                domElements.dataListSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
                // @ts-ignore
                domElements.dataListDescription.innerText = active.description;
    }
});