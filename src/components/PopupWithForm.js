import closePopup from '../utils/utils';

function PopupWithForm(props) {
  const { isOpen, title, name, children, onClose, onSubmit, btnText } = props;

  return (
    <div
      onClick={(e) => closePopup(e, onClose)}
      className={isOpen ? 'popup popup_opened' : 'popup'}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>

        <h2 className="popup__title">{title}</h2>
        <form className={`form form-${name}`} name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit">
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
