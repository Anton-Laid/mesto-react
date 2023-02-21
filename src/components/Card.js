function Card(props) {
  const { card, onCardClick } = props;

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
            <button className="photo__like" type="button"></button>
            <div className="photo__like-sum">{card.likes.length}</div>
          </div>
        </div>
        <button className="photo__removel"></button>
      </div>
    </div>
  );
}

export default Card;
