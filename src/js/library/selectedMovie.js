import { loadLocalStorage } from "../localStorage";
import { fetchGetMovieDetails, listGenresMovie } from "../getMovieDetails_API";
import { modal } from "../modal";

let arrayOfCardsMarkup = []; // Инициализация массива разметки карточек фильмов

const watchedFilms = document.querySelector('.js-library-button-watched'); // Находим кнопку WATCHED
const queueFilms = document.querySelector('.js-library-button-queue'); // Находим кнопку QUEUE
const selectedMovieContainer = document.querySelector('.js-library-container'); // Находим контейнер для выбранных фильмов

watchedFilms.addEventListener('click', loadWatchedFilms); // Вешаем слушатель на кнопку WATCHED
queueFilms.addEventListener('click', loadQueueFilms); // Вешаем слушатель на кнопку QUEUE

loadWatchedFilms(); // Вызываем функцию вывода просмотренных фильмов

// --------------------------------------------

// Функция вывода просмотренных фильмов
function loadWatchedFilms() {
    watchedFilms.classList.add('checked');
    queueFilms.classList.remove('checked');

    let watched = loadLocalStorage('watched');
    if (!watched) { watched = [] }; // Если данных нет - присвоить переменной пустой массив
    listSelectedMovie(watched); // Вызываем функцию рендера выбранных фильмов
};

// Функция вывода очереди фильмов на просмотр
function loadQueueFilms() {
    watchedFilms.classList.remove('checked');
    queueFilms.classList.add('checked');

    let queue = loadLocalStorage('queue');
    if (!queue) { queue = [] }; // Если данных нет - присвоить переменной пустой массив
    listSelectedMovie(queue); // Вызываем функцию рендера выбранных фильмов
};

// --------------------------------------------

// Функция рендера выбранных фильмов
function listSelectedMovie(arrayOfMovie) {
    arrayOfCardsMarkup = []; // Обнуляем массив разметки карточек фильмов
    arrayOfMovie.map(element => {   // Перебираем массив ID фильмов
        createFilmCards(element)    // Запрос по каждому ID фильма
            .then(responseCard => { // Ответ по запросу
                addCardToArray(responseCard); // Вызываем фцнкцию добавления разметки карточки в массив разметки
                selectedMovieContainer.innerHTML = arrayOfCardsMarkup.join(''); // Вставляем разметку фильмов в DOM
                modal(); // Вызываем функцию модального окна
            });
    });
}

// Функция формирования карточек фильмов
export function createFilmCards(cards) {
    return fetchGetMovieDetails(cards) // Вызываем функцию HTTP-запроса информации о конкретном фильме
        .then(response => {
            const { title, genres, release_date, poster_path, id } = response;
            const genresMovie = listGenresMovie(genres); // Вызываем функцию формирования массива жанров по их ID

                let pathToImage = ``; // Инициализация ссылки на постер фильма
                if (poster_path === null) { // Если в ответе бекэнда нет ссылки на постер фильма ->
                    pathToImage = `./images/background-mobile.jpg`; // -> показать постер-заглушку
                } else {
                    pathToImage = `https://image.tmdb.org/t/p/w500${poster_path}`;
                };

                return `
                <div class="film-container js-film-container" data-modal-open="${id}">
                    <div class="image-wrapper">
                        <img class="film-image" src="${pathToImage}" />
                    </div>
                    <h2 class="film-title">${title.toUpperCase()}</h2>
                    <p class="film-data">${genresMovie} | ${release_date.split('-')[0]}</p>
                </div>
                `;
        });
};

// Функция добавления разметки карточки в массив разметки
function addCardToArray(card) {
    let i = 0; // Счётчик совпадений

    // Проверяем, есть ли добавляемый фильм в списке для просмотра
    arrayOfCardsMarkup.forEach(element => {
        if (element === card) {
            i += 1; 
        }
    });

    if (i !== 0) {                     // Если фильм в списке есть ->
            return                     // -> ничего не делаем.
        } else {                       // Иначе ->
            arrayOfCardsMarkup.push(card); // -> добавляем фильм в список.
    };
};