import { createFilmCards, cardsMarkup } from './getMovieList_API';
import { element } from "../pagination";
import { modal } from "../modal";

const filmsContainer = document.querySelector('.js-films-container'); // Нашли контейнер по классу
const searchForm = document.querySelector('.js-search-form'); // Нашли форму поиска по классу
searchForm.addEventListener('submit', onSearch); // Вешаем слушатель на кнопку поиска?

export let isSearch = false; // Флаг "есть ли запрос пользователя"
export let searchQuery = ''; // Переменная для хранения запроса пользователя
const page = 1; // Стартовая страница пагинации ответа на запрос

// Функция обработки клика по кнопке "Искать"
function onSearch(evt) {
    evt.preventDefault(); // Запрет на перегрузку страницы
    searchQuery = evt.target[0].value; // Определяем данные в инпуте формы
    fetchSearchMovie(searchQuery, page) // Вызов функции запроса на сервер по названию фильма
        .then(response => { // Получение распарсенного ответа
            isSearch = true; // Флаг наличия запроса пользователя (для пагинации)

            if (response.results.length === 0) {
                alertMessage();
            }; // Если ответ пустой (нет данных) - вызвать функцию показа предупреждения 

            createFilmCards(response.results); // Вызываем функцию формирования карточек фильмов из getMovieList_API
            filmsContainer.innerHTML = cardsMarkup; // Вставляем разметку карточек в разметку контейнера
            modal(); // Вызываем функцию модального окна
            element(response.total_pages, page); // Вызываем функцию пагинации
            
        }) // Формирование карточки фильма если ответ пришел
        .catch(error => console.log(error)) // Обработка ошибок запроса
        .finally(() => searchForm.reset()); // Сбросить форму поиска после запроса
};

// Функция запроса на сервер по названию фильма
function fetchSearchMovie(movieTitle, page) {
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '70e00eb52bcb7ab46f183ec1381bf837';
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    return fetch(`${BASE_URL}/search/movie?query=${movieTitle}&api_key=${API_KEY}&include_adult=false&language=en-US&page=${page}`, options)
        .then(response => { return response.json() }); // Возврат распарсенного ответа и самого запроса
};

// Функция запроса по пагинации
export function fetchSearchPagination(page) {
    fetchSearchMovie(searchQuery, page) // Вызов функции запроса на сервер по названию фильма
        .then(response => { // Получение распарсенного ответа
            isSearch = true; // Флаг наличия запроса пользователя
            createFilmCards(response.results); // Вызываем функцию формирования карточек фильмов из getMovieList_API
            filmsContainer.innerHTML = cardsMarkup; // Вставляем разметку карточек в разметку контейнера
        }) // Формирование карточки фильма если ответ пришел
        .catch(error => console.log(error)) // Обработка ошибок запроса
};

// Функция вывода предупреждения
function alertMessage() {
    const alert = document.querySelector('.js-search-message'); // Нашли сообщение по классу
    alert.classList.add('show-message'); // Показать сообщение об ошибке поиска
    setTimeout(() => {
        alert.classList.remove('show-message');
    }, 4500); // Через 4,5 секунды убрать сообщение об ошибке поиска
};