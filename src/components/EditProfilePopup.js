import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React, { useContext, useState, useEffect } from 'react';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
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
      btnText="Сохранить"
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
    </PopupWithForm>
  );
}

export default EditProfilePopup;
