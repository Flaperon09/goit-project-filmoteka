import { getMovieDetails } from './getMovieDetails_API';
import { addQueue } from './queue';
import { addWatched } from './watched';

const filmsContainer = document.querySelector('.js-modal'); // Контейнер для фильмов
const modalElement = document.querySelector("[data-modal]"); // Модальное окно
const backdrop = document.querySelector('.js-modal__backdrop'); // Фон модального окна

let idMovie = 0; // Инициализация id фильма

// Обработчик открытия модального окна через всплытия событий.
export function modal() {
  
  filmsContainer.addEventListener('click', function(event) {
    const filmElement = event.target.closest('[data-modal-open]'); // Вешаем слушатель на открытие модалки
    
    // Проверяем, кликнут ли элемент с атрибутом data-modal-open
    if (!filmElement) return;

    // Если клик произошёл по нужному элементу, открываем модальное окно
    idMovie = filmElement.getAttribute('data-modal-open');
    document.body.classList.add("modal-open");
    modalElement.classList.remove("is-hidden");
    
    getMovieDetails(idMovie); // Вызов функции для получения деталей фильма    
  });
};

// Функция обработки кликов по кнопкам WATCHED и QUEUE в модальном окне 
export function modalClickButtons() {
  const modalButtonWatched = document.querySelector('.js-button-watched'); // Находим кнопку WATCHED
  const modalButtonQueue = document.querySelector('.js-button-queue'); // Находим кнопку QUEUE
  modalButtonWatched.addEventListener('click', () => addWatched(idMovie)); // Ставим слушатель на кнопку WATCHED
  modalButtonQueue.addEventListener('click', () => addQueue(idMovie)); // Ставим слушатель на кнопку QUEUE
}

// Функция закрытия модального окна
export function clsModal() {
  // Выбираем тег с аттрибутом "data-modal-close"
  const refs = {
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.closeModalBtn.addEventListener("click", closeModal); // Добавляем слушатель на кнопку закрытия модального окна
  backdrop.addEventListener('click', onBackdropClick); // Добавляем слушатель клика на бекдроп
  window.addEventListener('keydown', onEscKeyPress); // Добавляем слушатель клика на кнопку Esc

  // Обработчик закрытия модального окна 
  function closeModal() {
    document.body.classList.remove("modal-open");
    refs.modal.classList.add("is-hidden");
    refs.closeModalBtn.removeEventListener("click", closeModal); // Снимаем слушатель с кнопки закрытия модального окна
    backdrop.removeEventListener('click', onBackdropClick); // Снимаем слушатель с бекдропа
    window.removeEventListener('keydown', onEscKeyPress); // Снимаем слушатель с кнопки Esc
  };

  // Обработчик клика в бекдроп
  function onBackdropClick (event) {
    if (event.currentTarget === event.target) { // Если кликнули в бекдроп ->
      closeModal(); // -> вызываем функцию закрытия модалки.
    }
  };

  // Обработчик нажатия кнопки ESC
  function onEscKeyPress(event) {
    if (event.code === 'Escape') { // если нажата клавиша Esc ->
      closeModal(); // -> вызываем функцию закрытия модалки.
    } 
  };
};

/*
Данное модальное окно работает с динамическими (асинхронными) данными. Эта особенность учитывается в том,
что слушатели элементов открытого модального окна добавляются только после того, как данные модального окна
были динамически сформированы по ответу бекэнда. 
Модальное окно имеет возможность закрываться кликом по иконке (х) в модальном окне, по бекдропу и 
по нажатию клавиши ESC.
При закрытии модального окна снимаются слушатели с иконки закрытия, бекдропа и с кнопки ESC.
*/