import "./Card.css"; //Importing CSS file required for Card

function Card(props) {
  // Props-->
  // Name = Name of the Product
  // Id = Id of the Product
  // link = External Url of Product
  // Price = Price of Product
  // Currency = Currency of Price for Product
  // Rating = Rating of Product
  // Description = Description of Product
  //Image = Url to get image of Product
  //Brand = Brand of the Product, Manufacturer
  return (
    <div className="Card--container">
      {/* Linking to External Product Url */}
      {/* <a href={props.link} className="Card--link" target="_blank"> */}
      {/* Linking to Product Page, then user can go to external url to buy product */}
      <a href={'/'+ props.id} className="Card--link">
        {/* Product Image */}
        <img src={props.image} alt="Prodcuts Image" className="Card--image" />
        <div className="Card--detials">
          {/* Product Name */}
          <span className="Card--title">{props.name}</span>
          <br />
          <span className="Card--price">
            {/* Product Price */}
            {props.currency} {props.price}
          </span>
          {/* Product Rating, shown only if Rating is greater than 0 */}
          {props.rating > 0 && (
            <span className="Card--rating">| Rating: {props.rating}</span>
          )}
          <br />
          {/* Product Description */}
          <span className="Card--description">{props.description}</span>
        </div>
      </a>
    </div>
  );
}

export default Card;//Exporting Card
