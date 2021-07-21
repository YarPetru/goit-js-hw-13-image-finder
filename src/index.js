import './sass/main.scss';
import GetPicturesFromAPI from './js/getPictures.js'
import getRefs from './js/refs'

import galleryTpl from './templates/galleryTpl.hbs'

import { error, notice } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";



const getPicturesFromAPI = new GetPicturesFromAPI();

const refs = getRefs();



refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.upArrow.addEventListener('click', onUpArrow);
refs.downArrow.addEventListener('click', onDownArrow);

async function onSearch (evt) {
    evt.preventDefault();

    try {
        getPicturesFromAPI.query = evt.currentTarget.elements.query.value;
        evt.currentTarget.elements.query.value = '';

        if(getPicturesFromAPI.query === '') {
            return error({
                text: "Sorry, but for start of search you have to enter the word",
                delay: 3000,
                mouseReset: true,
            });
        };

        getPicturesFromAPI.resetPage();
        refs.loader.classList.remove('is-hidden');
        const images = await getPicturesFromAPI.fetchImages();
        
        checkImagesPresence(images);
        clearGalleryContainer(images);
        insertImagesMarkup(images);
        scrollAfterLoad();

        refs.loader.classList.add('is-hidden');
    } catch {
        return error({
            text: "Sorry, but something went wrong",
            delay: 3000,
            mouseReset: true,
        });
    };  
};

async function onLoadMore () {
    refs.loader.classList.remove('is-hidden');
    const images = await getPicturesFromAPI.fetchImages();
    insertImagesMarkup(images);    
    refs.loader.classList.add('is-hidden');
    scrollAfterLoad();
};

function insertImagesMarkup (images) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(images));
    refs.loadMoreBtn.classList.remove('is-hidden');
};

function clearGalleryContainer () {
    refs.gallery.innerHTML = '';
};

function checkImagesPresence (array) {
    if (array.length === 0) {
        return notice({
            text: "Sorry, there are not pictures by your search, try to enter something else",
            delay: 3000,
        });
    }
};

function scrollAfterLoad () {
    refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function onDownArrow (e) {
    e.preventDefault();
    refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function onUpArrow (e) {
    e.preventDefault();
    refs.form.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}

