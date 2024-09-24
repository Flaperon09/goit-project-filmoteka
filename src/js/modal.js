export function modal() {
  // Переменная для хранения ID выбранного фильма
  let idMovie = null;

  // Выбираем все теги с аттрибутом "data-modal-open"
  const refs = {
    openModalBtn: document.querySelectorAll("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  // Снимаем предыдущие слушатели с карточек фильмов
  for (i = 0; i < refs.openModalBtn.length; i += 1) {
    refs.openModalBtn[i].removeEventListener("click", openModal);
  }

  // Добавляем слушатели на карточки фильмов
  for (i = 0; i < refs.openModalBtn.length; i += 1) {
    refs.openModalBtn[i].addEventListener("click", openModal);
  }

  // Функция открытия модального окна
  function openModal(event) {
    document.body.classList.add("modal-open");
    refs.modal.classList.remove("is-hidden");
    refs.closeModalBtn.addEventListener("click", closeModal); // Добавляем слушатель на кнопку закрытия модального окна
    idMovie = event.currentTarget.getAttribute('data-modal-open'); // Определяем ID фильма, по карточке которого кликнули
  }

  // Функция закрытия модального окна
  function closeModal() {
    document.body.classList.remove("modal-open");
    refs.modal.classList.add("is-hidden");
    refs.closeModalBtn.removeEventListener("click", closeModal); // Снимаем слушатель с кнопки закрытия модального окна
  };
}
