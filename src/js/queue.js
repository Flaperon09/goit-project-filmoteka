import {saveLocalStorage, loadLocalStorage} from './localStorage';

const key = 'queue'; // Ключ локального хранилища для просмотренных фильмов

let queueMovie = loadLocalStorage(key); // Загружаем сохранённые в локальном хранилище данные
if (!queueMovie) { queueMovie = [] }; // Если данных нет - присвоить переменной пустой массив

export function addQueue(idMovie) {
    let i = 0; // Счётчик совпадений

    // Проверяем, есть ли добавляемый фильм в списке для просмотра
    queueMovie.forEach(element => {
        if (element === idMovie) {
            i += 1; 
        }
    });

    if (i !== 0) {                     // Если фильм в списке есть ->
            return                     // -> ничего не делаем.
        } else {                       // Иначе ->
            queueMovie.push(idMovie) // -> добавляем фильм в список.
    };

    // Добавляем массив фильмов в локальное хранилище.
    saveLocalStorage(key, queueMovie); 
};