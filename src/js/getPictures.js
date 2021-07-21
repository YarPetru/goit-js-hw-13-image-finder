
const BASE_URL = 'https://pixabay.com/api/';  
const API_KEY = '22589874-279001e5aa41854e6f4bab8de';

export default class GetPicturesFromAPI {
    constructor() {
        this.searchQuery ='';
        this.page = 1;
    }

    async fetchImages () {
        console.log(this);

            const response = await fetch(`${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`);
            
            if(!response.ok) {
                throw new Error(response.statusText);
            }

            const images = await response.json();
            this.incrementPage();
            return await images.hits;
    }

    incrementPage () {
        this.page +=1;
    }

    resetPage () {
        this.page =1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}