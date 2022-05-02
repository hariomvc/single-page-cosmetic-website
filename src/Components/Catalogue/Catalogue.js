import "./Catalogue.css";
import React, { useEffect, useState } from "react";
import Card from "./Card/Card";

function Catalogue() {
  const brands = [
    {
      id: 1,
      name: "nyx",
      api: "https://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx",
    },
    {
      id: 2,
      name: "dior",
      api: "https://makeup-api.herokuapp.com/api/v1/products.json?brand=dior",
    },
    {
      id: 3,
      name: "clinique",
      api: "https://makeup-api.herokuapp.com/api/v1/products.json?brand=clinique",
    },
  ];
  const [brand, setBrand] = useState("");
  const [products, setProducts] = useState([]);
  const [sorter, setSorter] = useState("");
  const [productsnyx, setProductsnyx] = useState(0);
  const [productsdior, setProductsdior] = useState(0);
  const [productsclinique, setProductsclinique] = useState(0);
  const fetchData = () => {
    let url = "https://makeup-api.herokuapp.com/api/v1/products.json?";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      });
  };

  const [query, setQuery] = useState("");

  const [result, setResult] = useState(false);
  const [resultnyx, setresultnyx] = useState(false);
  const [resultdior, setresultdior] = useState(false);
  const [resultclinique, setresultclinique] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {products.length > 0 &&
        products.map((product) => (
          <div>
            <Card
              brand={product.brand}
              name={product.name}
              price={product.price}
              image={product.image_link}
              link={product.product_link}
              description={product.description}
              rating={product.rating}
              currency={product.price_sign}
            />
          </div>
        ))}
    </div>
  );
}

export default Catalogue;
