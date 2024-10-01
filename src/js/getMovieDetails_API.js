import { clsModal, modalClickButtons } from "./modal";

const movieContainer = document.querySelector('.js-modal__movie'); // Контейнер карточки фильма

// Функция запроса детальной информации о фильме
export function getMovieDetails(id) {
    fetchGetMovieDetails(id)
        .then(response => {
            console.log('response: ', response);
            createFilmInfo(response); // Вызываем функцию формирования информации для модального окна
            movieContainer.innerHTML = cardMarkup; // Вставляем разметку карточки в разметку модалки
            clsModal(); // Вызываем функцию закрытия модального окна
            modalClickButtons(); // Вызываем функцию слушателей для кнопок WATCHED и QUEUE
        })
        .catch(err => console.error(err));
};

// Функция HTTP-запроса информации о конкретном фильме
export function fetchGetMovieDetails(id) {
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '70e00eb52bcb7ab46f183ec1381bf837';
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`, options)
        .then(response => { return response.json() });
}

// Функция формирования информации для модального окна
function createFilmInfo({ title, vote_average, vote_count, popularity,
    original_title, genres, poster_path, overview}) {

    const genresMovie = listGenresMovie(genres); // Вызываем функцию формирования массива жанров по их ID
    
    return cardMarkup = `
        <img class="modal__image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="poster" />
        <div class="modal__info">
            <h2 class="modal__header">${title.toUpperCase()}</h2>
            <table class="modal__table">
                <tr>
                    <td>Vote / Votes</td>
                    <td><span class="modal__table--accent">${vote_average.toFixed(1)} </span> / ${vote_count}</td>
                </tr>
                <tr>
                    <td>Popularity</td>
                    <td>${popularity.toFixed(1)}</td>
                </tr>
                <tr>
                    <td>Original Title</td>
                    <td>${original_title}</td>
                </tr>
                <tr>
                    <td>Genre</td>
                    <td>${genresMovie}</td>
                </tr>
            </table>
            <h3 class="modal__about">ABOUT</h3>
            <p class="modal__text">${overview}</p>
            <div class="modal__buttons js-modal__buttons">
                <button class="modal__button js-button-watched" type="button">
                    ADD TO WATCHED
                </button>
                <button class="modal__button js-button-queue" type="button">ADD TO QUEUE</button>
            </div>
            <!-- Кнопка закрытия модального окна -->
            <button type="button" class="modal__button-close">
                <svg class="modal__icon" data-modal-close width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
                    <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
                </svg>
            </button>
        </div>
        `;
    
};

// Функция получения жанров фильма
export function listGenresMovie(genres) {
    movieGenres = []; // Обнуление массива жанров текущего фильма
    genres.map(({ name }) => {  // Перебераем массив существующих жанров  
        movieGenres.push(name); // -> добавить название существующего жанра в массив
    });
    return movieGenres.join(', ');
};