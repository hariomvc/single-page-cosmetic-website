import "./Card.css";

function Card(props) {
  return (
    <div className="Card--container">
      <a href={props.link} className="Card--link" target="_blank">
        <img src={props.image} alt="Prodcuts Image" className="Card--image" />
        <div className="Card--detials">
          <span className="Card--title">
            {props.name}
          </span>
          <br />
          <span className="Card--price">
            {props.currency} {props.price}
          </span>
          {props.rating > 0 && (
            <span className="Card--rating">| Rating: {props.rating}</span>
          )}
          <br />
          <span className="Card--description">{props.description}</span>
        </div>
      </a>
    </div>
  );
}

export default Card;
