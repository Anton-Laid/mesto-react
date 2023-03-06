import closePopup from '../utils/utils';

function ImagePopup(props) {
  const { isOpen, onClose } = props;

  return (
    <div
      className={isOpen.link ? 'popup popup_opened' : 'popup'}
      onClick={(e) => closePopup(e, onClose)}
    >
      <div className="popup-foto__box">
        <img
          className="popup-foto__images"
          src={isOpen.link}
          alt={isOpen.name}
        />
        <p className="popup-foto__title">{isOpen.name}</p>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
