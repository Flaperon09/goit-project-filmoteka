import { element } from "./pagination";
import { modal } from "./modal";

const listOfGenres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
]; // Массив ID жанров фильмов

let movieGenres = []; // Инициализация массива жанров для фильма
export let cardsMarkup = ''; // Инициализация разметки карточки фильма
let page = 1; // Стартовая страница рендера
let hasBeenCalledElement = false; // Флаг однократного вызова пагинации при первом рендере
let hasBeenCalledModal = false; // Флаг однократного вызова функции модального окна

let seconRender = 0; // Количество рендеров страниц в данной сессии

fetchListMovie(page); // Первый вызов рендера страницы

// Функция запроса списка фильмов
export function fetchListMovie(page) {
    // Исключаем повторный рендер списка фильмов после перезагрузки страницы ->
    // -> из запроса пагинации по первой странице
    seconRender += 1;
    if (seconRender === 2) { return }; 

    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '70e00eb52bcb7ab46f183ec1381bf837';
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=${page}`, options)
        .then(response => response.json())
        .then(response => {
            createFilmCards(response.results); // Вызываем функцию формирования карточек фильмов
            const filmsContainer = document.querySelector('.js-films-container'); // Нашли контейнер по классу
            filmsContainer.innerHTML = cardsMarkup; // Вставляем разметку карточек в разметку контейнера
            // Условие однократного вызова функции модального окна (для избежания накопления слушателей)
            // if (!hasBeenCalledModal) {
                modal();
            //     hasBeenCalledModal = true;
            // };
            
            const totalPages = totPgs(response.total_pages);  // Вызов функции определения общего количества страниц в ответе.
            if (!hasBeenCalledElement) {     // Если это первая загрузка страницы ->
                element(totalPages, page);   // -> вызвать функцию рендера блока пагинации ->
                hasBeenCalledElement = true; // -> поставить флаг, что первая загрузка произошла
            };
        })
        .catch(err => console.error(err));
};

// Функция формирования карточек фильмов
export function createFilmCards(cards) {
    console.log(cards);
    return cardsMarkup = cards.map(({ title, genre_ids, release_date, poster_path, id }) => {
        listGenres(genre_ids); // Вызываем функцию формирования массива жанров по их ID
        return `
        <div class="film-container js-film-container" data-modal-open="${id}">
            <div class="image-wrapper">
                <img class="film-image" src="https://image.tmdb.org/t/p/w500${poster_path}" />
            </div>
            <h2 class="film-title">${title.toUpperCase()}</h2>
            <p class="film-data">${[...movieGenres].join(', ')} | ${release_date.split('-')[0]}</p>
        </div>
        `;
    }).join('');
};

// Функция формирования массива жанров по их ID
function listGenres(genre_ids) {
    movieGenres = []; // Обнуление массива жанров текущего фильма
    listOfGenres.map(({ id, name }) => {  // Перебераем массив существующих жанров
        genre_ids.forEach(number => {   // Перебираем массив жанров текущего фильма
            if (id === number) {        // Если id существующего жанра совпал с id жанра фильма -> 
                movieGenres.push(name); // -> добавить название существующего жанра в массив
            };
        })
    });
    return movieGenres;
};

// Функция определения общего количества страниц в ответе
function totPgs(num) {
    if (num > 500) {
        return totalPages = 500;
    }; // Если страниц больше 500 - установить количество 500 страниц
    return totalPages = num;
}