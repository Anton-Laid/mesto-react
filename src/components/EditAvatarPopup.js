import PopupWithForm from './PopupWithForm';
import React, { useRef } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
    avatar.current.value = '';
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText="Сохранить"
    >
      <input
        id="form-avatar"
        name="inputAvatar"
        className="popup__input popup__avatar"
        type="url"
        required
        placeholder="Ссылка на картинку"
        ref={avatar}
        onChange={(e) => e.target.value}
      />
      <span className="form-avatar-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
