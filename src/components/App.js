import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './imagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // Открытие popup Avatar
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  // Обнуление и передача input Avatar
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  // Открытие popup Обновить профиль
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  // Обнуление и передача input Обновить профиль
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  // Открытие popup для добавления фото
  const [isEditPhotoPopupOpen, setIsEditPhotoPopupOpen] = React.useState(false);
  // Закрытие popup для добавления фото
  const handleEditPhotoClick = () => {
    setIsEditPhotoPopupOpen(!isEditPhotoPopupOpen);
  };
  // Объект карточек
  const [selectedCard, setSelectedCard] = React.useState({});
  // Обновление объекта карточек
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  // Получение {} с инф пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  // Получение [] карточек
  const [cards, setCards] = React.useState([]);

  // Работа с лайками
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((satate) => satate.filter((i) => i._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обновление профеля пользователя
  function handleUpdateUser({ name, about }) {
    api
      .getRedactProfile({ name, about })
      .then((data) => {
        setCurrentUser(data);
        handleEditProfileClick();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // обновление аватара пользователя
  function handleUpdateAvatar({ avatar }) {
    api
      .getAvatarUser({ avatar })
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
        handleEditAvatarClick();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // добавление карточки
  function opUpdataCard({ name, link }) {
    api
      .getNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleEditPhotoClick();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    Promise.all([api.getInfoUser(), api.getCardsList()])
      .then(([userData, dataCards]) => {
        setCurrentUser(userData);
        setCards(dataCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          cards,
          handleCardLike,
          handleCardDelete,
        }}
      >
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onEditAddPhoto={handleEditPhotoClick}
          onCardClick={(card) => handleCardClick(card)}
        />
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleEditAvatarClick}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleEditProfileClick}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isEditPhotoPopupOpen}
          onClose={handleEditPhotoClick}
          opUpdataCard={opUpdataCard}
        />

        <ImagePopup
          onClose={() => handleCardClick({})}
          isOpen={selectedCard}
          currentUser={currentUser}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
