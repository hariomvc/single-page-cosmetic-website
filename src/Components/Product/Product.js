import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <img src={product.image_link} alt="Prodcuts Image" className="" />
      <span>{product.name}</span>
      <span>{product.price_sign} {product.price}</span>
      {product.rating>0 && <span>Rating: {product.rating}</span>}
      <span>{product.description}</span>
    </div>
  );
}

export default Product;
