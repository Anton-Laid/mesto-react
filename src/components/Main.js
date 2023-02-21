import React from 'react';
import { api } from '../utils/constants';
import Card from './Card';

function Main(props) {
  const { onEditAvatar, onEditProfile, onEditAddPhoto, onCardClick } = props;

  const [userAvatar, setUserAvatar] = React.useState('');
  const [userInfo, setUserInfo] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInfoUser(), api.getCardsList()])
      // тут деструктурируете ответ от сервера
      .then(([userData, dataCards]) => {
        setUserAvatar(userData.avatar);
        setUserInfo(userData.name);
        setDescription(userData.about);
        setCards(dataCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        {/* // */}
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${userAvatar})` }}
          onClick={onEditAvatar}
        >
          <div className="profile__avatar-image"></div>
          <button className="profile__avatar-button" type="button"></button>
        </div>
        {/* // */}
        <div className="profile__info">
          <h1 className="profile__title">{userInfo}</h1>
          <p className="profile__subtitle">{description}</p>
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
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
