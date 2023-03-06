import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // Submit для редактирования профиля
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Редактировать профиль"
      name="name"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name || ''}
        name="name"
        id="form-name"
        className="popup__input popup__type-name"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={(e) => setName(e.target.value)}
      />
      <span className="form-name-error form__input-error"></span>

      <input
        value={description || ''}
        id="form-job"
        className="popup__input popup__type-job"
        type="text"
        name="job"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        onChange={(e) => setDescription(e.target.value)}
      />
      <span className="form-job-error form__input-error"></span>
      <button className="popup__button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
