import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick, handleCardLike, handleCardDelete } = props;

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);

  const cardLikeButtonClassName = `photo__like 
  ${isLiked && 'photo__like_active'}`;

  return (
    <div id="template" className="template">
      <div className="photo">
        <img
          src={card.link}
          alt={card.name}
          className="photo__image"
          onClick={() => onCardClick(card)}
        />
        <div className="photo__box">
          <h2 className="photo__title">{card.name}</h2>
          <div>
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={() => handleCardLike(card)}
            ></button>
            <div className="photo__like-sum">{card.likes.length}</div>
          </div>
        </div>
        {isOwn && (
          <button
            className="photo__removel"
            onClick={() => handleCardDelete(card)}
          ></button>
        )}
      </div>
    </div>
  );
}

export default Card;
