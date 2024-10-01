import {saveLocalStorage, loadLocalStorage} from './localStorage';

const key = 'watched'; // Ключ локального хранилища для просмотренных фильмов

let watchedMovie = loadLocalStorage(key); // Загружаем сохранённые в локальном хранилище данные
if (!watchedMovie) { watchedMovie = [] }; // Если данных нет - присвоить переменной пустой массив

export function addWatched(idMovie) {
    let i = 0; // Счётчик совпадений

    // Проверяем, есть ли добавляемый фильм в списке для просмотра
    watchedMovie.forEach(element => {
        if (element === idMovie) {
            i += 1; 
        }
    });

    if (i !== 0) {                     // Если фильм в списке есть ->
            return                     // -> ничего не делаем.
        } else {                       // Иначе ->
            watchedMovie.push(idMovie) // -> добавляем фильм в список.
    };

    // Добавляем массив фильмов в локальное хранилище.
    saveLocalStorage(key, watchedMovie); 
};
