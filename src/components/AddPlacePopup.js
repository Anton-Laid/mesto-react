import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function AddPlacePopup({ isOpen, onClose, opUpdataCard }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setLink(currentUser.link);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    opUpdataCard({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Новое место"
      name="add"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="form-title"
        name="popuoTitle"
        required
        className="popup__input popup__type-title"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="form-title-error form__input-error"></span>

      <input
        id="form-img"
        name="popuoImage"
        className="popup__input popup__type-img"
        required
        type="url"
        placeholder="Ссылка на картинку"
        minLength="2"
        maxLength="200"
        value={link || ''}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="form-img-error form__input-error"></span>

      <button className="popup__button" type="submit">
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
