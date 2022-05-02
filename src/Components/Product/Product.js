import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import './Product.css';

function Product() {
  let { id } = useParams();
  let url = "https://makeup-api.herokuapp.com/api/v1/products/" + id + ".json";
    const [product, setProduct] = useState({});
  const fetchData = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {setProduct(data)});
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Product--container">
      <img src={product.image_link} alt="Prodcuts Image" className="Product--image" />
      <div className="Product--detials">
      <span className="Product--title">{product.name}</span>
      <span className="Product--subtitle">{product.price_sign} {product.price}</span>
      {product.rating>0 && <span className="Product--subtitle">Rating: {product.rating}</span>}
      <span className="Product--description">{product.description}</span>
      <a href={product.product_link} className="Product--link" target='_blank' >Buy Now!</a>
      </div>
    </div>
  );
}

export default Product;
