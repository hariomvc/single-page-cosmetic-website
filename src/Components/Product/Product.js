import { useState, useEffect } from "react"; //Importing UseState and UseEffect from react
import { useParams } from "react-router-dom";
import "./Product.css"; //Importing CSS File for Product's Individual Page

function Product() {
  let { id } = useParams();
  //api
  let url = "https://makeup-api.herokuapp.com/api/v1/products/" + id + ".json";
  //state variable to store product data
  const [product, setProduct] = useState({});
  //fetching Data
  const fetchData = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      });
  };
  //use effect
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Product--container">
      {/* Rendering the Detials about the Product */}
      <img
        src={product.image_link}
        alt="Prodcuts Image"
        className="Product--image"
      />
      <div className="Product--detials">
        <span className="Product--title">{product.name}</span>
        <span className="Product--subtitle">
          {product.price_sign} {product.price}
        </span>
        {product.rating > 0 && (
          <span className="Product--subtitle">Rating: {product.rating}</span>
        )}
        <span className="Product--description">{product.description}</span>
        <a
          href={product.product_link}
          className="Product--link"
          target="_blank"
        >
          Buy Now!
        </a>
      </div>
    </div>
  );
}

export default Product;
