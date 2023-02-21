function ImagePopup(props) {
  const { isOpen, onClose } = props;

  return (
    <div className={isOpen.name ? 'popup popup_opened' : 'popup'}>
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
