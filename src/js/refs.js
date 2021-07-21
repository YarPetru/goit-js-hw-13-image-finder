export default function getRefs() {
    return {
        form: document.querySelector('#search-form'),
        loadMoreBtn: document.querySelector('[data-action="load-more"]'),
        gallery: document.querySelector('.gallery'),
        loader: document.querySelector('.loader-js'),
        upArrow: document.querySelector('.up-js'),
        downArrow: document.querySelector('.down-js'),
    }
}

