import { fetchListMovie } from "./getMovieList_API";
import { isSearch, fetchSearchPagination, searchQuery } from "./getSearchMovie_API";

const ulTag = document.querySelector('.js-pagination-list'); // Выбираем список кнопок пагинации.
const paginationContainer = document.querySelector('.js-pagination-container'); // Выбираем список кнопок пагинации.

// Функция рендера блока пагинации
export function element(totalPages, page) {

    // Проверка необходимости рендерить блок пагинации
    if (totalPages < 2 || (isSearch && searchQuery == [])) {
        paginationContainer.classList.add('hidden');
        return;
    }; // Если общее количество страниц меньше 2 или активен запрос пользователя и ответ пустой ->
       // -> (т.е. нет данных) - пагинацию не рендерить (добавить в контейнер пагинации класс 'hidden')

    let liTag = ''; // Инициализация пустого тега <li> для избежания появления "undefined".
    let activeLi = ''; // Инициализация активного тега <li> для избежания появления "undefined".
    let beforePage = page - 2; // Начало диапазона кнопок пагинации.
    let afterPage = page + 2; // Конец диапазона кнопок пагинации.

    if (page > 1) {
        liTag += `<li class="btn prev" onClick='element(${totalPages}, ${page - 1})'>L</li>`;
    }; // Если номер страницы больше 1 - добавить кнопку ВЛЕВО.

    if (window.innerWidth > 767) {
        if (page > 3) { // Если номер текущей страницы больше 2 - добавить страницу с номером 1.
            liTag += `<li class="numb" onClick='element(${totalPages}, 1)'><span>1</span></li>`;
            if (page > 4) { // Если номер текущей страницы больше 3 - добавить страницу с точками (...)
                liTag += `<li class="dots"><span>...</span></li>`;
            }
        }; 
    }; // Если ширина вьюпорта более 767 пикселей.

    // Сколько номеров рендерить до текущей страницы
    if (page === totalPages) { // Если номер страницы равен общ. кол-ву страниц - рендерить на 2 меньше
        beforePage = beforePage - 2; 
    } else if (page === totalPages - 1) { // Если номер страницы на 1 меньше общ. кол-ва страниц - рендерить на 1 меньше
        beforePage = beforePage - 1; 
    };

    // Сколько номеров рендерить после текущей страницы
    if (page === 1) { // Если номер страницы равен 1 - рендерить на 2 больше
        afterPage = afterPage + 2;
    } else if (page === 2) { // Если номер страницы равен 2 - рендерить на 1 больше
        afterPage = afterPage + 1;
    };

    for (let pageLenght = beforePage; pageLenght <= afterPage; pageLenght += 1) {
        if (pageLenght > totalPages || pageLenght < 1) {
            continue;
        }; // Если номер текущей страницы меньше 1 или больше общего кол-ва страниц - 
           // - не формировать цифры пагинации. 

        if (pageLenght === 0) {
            pageLenght += 1;
        }; // Если количество страниц равно 0 - добавить 1

        if (pageLenght === page) {
            activeLi = "active";  // Если номер текуще страницы равен pageLenght - добавить стиль active
            page = pageLenght;    // Текущая страница - это активная страница

            if (isSearch) {                  // Если активен запрос пользователя ->
                fetchSearchPagination(page); // -> пагинация по запросу пользователя
            } else {                         // -> иначе
                fetchListMovie(page);        // -> пагинация по начальному списку фильмов
            };
            
        } else {
            activeLi = "";
        }; 

        liTag += `<li class="numb ${activeLi}" onClick='element(${totalPages}, ${pageLenght})'><span>${pageLenght}</span></li>`; // Перелистывание
        // страниц при клике по цифрам пагинации.
    }; // Добавление цифровых кнопок пагинации.

    if (window.innerWidth > 767) {
        if (page < totalPages - 2) { // Если номер текущей страницы на 1 меньше общего количества страниц - добавить 
        // страницу с номером общего количества страниц.
            if (page < totalPages - 3) { // Если номер текущей страницы на 2 меньше общего количества страниц - добавить страницу с точками (...)
                liTag += `<li class="dots"><span>...</span></li>`;
            };
            liTag += `<li class="numb" onClick='element(${totalPages}, ${totalPages})'><span>${totalPages}</span></li>`;
        }; 
    }; // Если ширина вьюпорта более 767 пикселей

    if (page < totalPages) {
        liTag += `<li class="btn next" onclick='element(${totalPages}, ${page + 1})'>R</li>`;
    }; // Если номер страницы меньше общего кол-ва страниц - добавить кнопку ВПРАВО.

    ulTag.innerHTML = liTag; // Добавляем теги в разметку пагинации.
};

// Добавление функции element в глобальную область видимости.
window.element = element;

// Вызов функции рендера блока пагинации
// element(totalPages, page);

// window.innerWidth - определение ширины вьюпорта в JS