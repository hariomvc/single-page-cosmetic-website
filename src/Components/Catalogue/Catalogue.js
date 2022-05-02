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
                    <input
              type="text"
              name="search"
              placeholder="Search cosmetic across brands"
              className="Header--search--input"
              onChange={(event) => {
                setQuery(event.target.value);
                setResult(false);
                setresultnyx(false);
                setresultdior(false);
                setresultclinique(false);
              }}
            />
            <select
                onChange={(event) => {
                  setSorter(event.target.value);
                }}
                className="Header--sort--select"
              >
                <option value="rating">Rating</option>
                <option value="price">Price</option>
              </select>
              {query != "" && (
          <div>
            {() => setBrand("")}
            <div>
              {() => setBrand(0)}
              {brands.map((Brand) => (
                <div>
                  {((Brand.id == 1 && resultnyx) ||
                    (Brand.id == 2 && resultdior) ||
                    (Brand.id == 3 && resultclinique)) && (
                    <div className="Catalogue--brand--row">{Brand.name}</div>
                  )}
                  <div className="Catalogue--grid">
                    {products.length > 0 &&
                      products
                        .filter((product) => {
                          if (
                            product.name
                              .toLowerCase()
                              .includes(query.toLowerCase()) &&
                            Brand.name == product.brand
                          ) {
                            if (!result) {
                              setResult(true);
                            }
                            if (product.brand == "nyx" && !resultnyx) {
                              setresultnyx(true);
                            } else if (product.brand == "dior" && !resultdior) {
                              setresultdior(true);
                            } else if (
                              product.brand == "clinique" &&
                              !resultclinique
                            ) {
                              setresultclinique(true);
                            }
                            return product;
                          }
                        })
                        .map((product) => (
                          <div>
                            {() => setResult(true)}
                            {result && (
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
                            )}
                          </div>
                        ))}
                  </div>
                </div>
              ))}
              {!result && (
                <div className="no-result--container">
                  <span className="no-result--text">No Results Found.</span>
                  <span className="no-result--text">We can't find any matches for "{query}".</span>
                </div>
              )}
            </div>
          </div>
        )}
        {query === "" && (
          <div className="Catalogue--grid">
            {products.length > 0 &&
              products
                .filter((product) => {
                  if (brand === "") {
                    return product;
                  } else if (brand === product.brand) {
                    return product;
                  }
                })
                .sort((a, b) => {
                  if (sorter == "price") {
                    if (a.price < b.price) {
                      return -1;
                    }
                    if (a.price > b.price) {
                      return 1;
                    }
                    return 0;
                  } else if (sorter == "rating") {
                    if (a.rating > b.rating) {
                      return -1;
                    }
                    if (a.rating < b.rating) {
                      return 1;
                    }
                    return 0;
                  } else {
                    if (a.name < b.name) {
                      return -1;
                    }
                    if (a.name > b.name) {
                      return 1;
                    }
                    return 0;
                  }
                })
                .map((product) => (
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
                ))}
          </div>
        )}
      {/* {products.length > 0 &&
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
        ))} */}
    </div>
  );
}

export default Catalogue;
