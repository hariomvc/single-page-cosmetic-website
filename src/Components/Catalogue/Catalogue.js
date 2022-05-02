import "./Catalogue.css";
import React, { useEffect, useState } from "react";

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
  useEffect(() => {
    fetchData();
  }, []);
  return (<div>Test</div>);
}

export default Catalogue;
