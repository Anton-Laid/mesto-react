import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup({ isOpen, onClose, opUpdataCard }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    opUpdataCard({
      name,
      link,
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Новое место"
      name="add"
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText="Создать"
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
    </PopupWithForm>
  );
}

export default AddPlacePopup;
