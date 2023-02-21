function PopupWithForm(props) {
  const { isOpen, title, name, children, onClose } = props;

  return (
    <div className={isOpen ? 'popup popup_opened' : 'popup'}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>

        <h2 className="popup__title">{title}</h2>
        <form className={`form form-${name}`} name={name}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
