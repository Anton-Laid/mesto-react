import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './imagePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const [isEditPhotoPopupOpen, setIsEditPhotoPopupOpen] = React.useState(false);

  const handleEditPhotoClick = () => {
    setIsEditPhotoPopupOpen(!isEditPhotoPopupOpen);
  };

  const [selectedCard, setSelectedCard] = React.useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
    console.log(card);
  };

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onEditAddPhoto={handleEditPhotoClick}
        onCardClick={(card) => handleCardClick(card)}
      />
      <Footer />
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        title="Обновить аватар"
        name="avatar"
        onClose={handleEditAvatarClick}
      >
        <input
          id="form-avatar"
          name="inputAvatar"
          required
          className="popup__input popup__avatar"
          type="url"
          placeholder="Ссылка на картинку"
        />
        <span className="form-avatar-error form__input-error"></span>

        <button className="popup__button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        title="Редактировать профиль"
        name="user"
        onClose={handleEditProfileClick}
      >
        <input
          id="form-name"
          className="popup__input popup__type-name"
          type="text"
          name="name"
          placeholder="Имя"
          required
        />
        <span className="form-name-error form__input-error"></span>

        <input
          id="form-job"
          className="popup__input popup__type-job"
          type="text"
          name="profession"
          placeholder="О себе"
          required
        />
        <span className="form-job-error form__input-error"></span>
        <button className="popup__button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditPhotoPopupOpen}
        title="Новое место"
        name="add"
        onClose={handleEditPhotoClick}
      >
        <input
          id="form-title"
          name="popuoTitle"
          required
          className="popup__input popup__type-title"
          type="text"
          placeholder="Название"
        />
        <span className="form-title-error form__input-error"></span>

        <input
          id="form-img"
          name="popuoImage"
          className="popup__input popup__type-img"
          required
          type="url"
          placeholder="Ссылка на картинку"
        />
        <span className="form-img-error form__input-error"></span>

        <button className="popup__button" type="submit">
          Создать
        </button>
      </PopupWithForm>
      <ImagePopup onClose={() => handleCardClick({})} isOpen={selectedCard} />
    </>
  );
}

export default App;
