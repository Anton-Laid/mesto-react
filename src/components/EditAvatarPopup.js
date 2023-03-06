import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="form-avatar"
        name="inputAvatar"
        className="popup__input popup__avatar"
        type="url"
        required
        placeholder="Ссылка на картинку"
        value={avatar || ''}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <span className="form-avatar-error form__input-error"></span>

      <button className="popup__button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
