function closePopup(e, onClose) {
  if (e.target === e.currentTarget) onClose();
}

export default closePopup;
