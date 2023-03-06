import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const { onEditAvatar, onEditProfile, onEditAddPhoto, onCardClick } = props;

  const { currentUser, cards, handleCardLike } =
    React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        {/* // */}
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={onEditAvatar}
        >
          <div className="profile__avatar-image"></div>
          <button className="profile__avatar-button" type="button"></button>
        </div>
        {/* // */}
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            className="profile__rectangle"
            type="button"
            onClick={onEditProfile}
          >
            <div className="profile__vector"></div>
          </button>
        </div>
        {/* // */}
        <button
          type="button"
          className="profile__button"
          onClick={onEditAddPhoto}
        >
          <div className="profile__button-plus"></div>
        </button>
      </section>
      {/* // */}
      <section className="photos">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardClick={onCardClick}
              handleCardLike={handleCardLike}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
