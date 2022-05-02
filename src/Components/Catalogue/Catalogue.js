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

  const [sorter, setSorter] = useState("");

  const [products, setProducts] = useState([]);
  const [productsnyx, setProductsnyx] = useState(0);
  const [productsdior, setProductsdior] = useState(0);
  const [productsclinique, setProductsclinique] = useState(0);
  const fetchData = () => {
    let url = "";
    brands.forEach(function (Brand) {
      url = Brand.api;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let newdata = products;
          data.map((product)=>newdata.push(product))
          if (Brand.name === "nyx") {
            setProductsnyx(data.length);
            console.log(data.length);
            setProducts(newdata);
          } else if (Brand.name === "dior") {
            setProductsdior(data.length);
            console.log(data.length);
            setProducts(newdata);
          } else if (Brand.name === "clinique") {
            setProductsclinique(data.length);
            console.log(data.length);
            setProducts(newdata);
          }
        });
    });

    // url = "https://makeup-api.herokuapp.com/api/v1/products.json?";

    // fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setProducts(data);
    //   });
  };

  const [query, setQuery] = useState("");

  const [result, setResult] = useState(false);

  // const [results, setResults] = useState([false, false, false]);
  const [resultnyx, setresultnyx] = useState(false);
  const [resultdior, setresultdior] = useState(false);
  const [resultclinique, setresultclinique] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="Catalogue--container">
        {/* <Header /> */}
        {/* {results.map((Result)=>{Result && <div>Set</div>})} */}
        <div className="fixed-top">
        <div className="Header--container">
          <div className="Header--search--container">
            <img
              src="/assests/icons/search.png"
              alt="search"
              className="Header--search--icon"
            />
            <input
              type="text"
              id="search-box"
              name="search"
              placeholder="Search cosmetic across brands"
              className="Header--search--input"
              onChange={(event) => {
                setQuery(event.target.value);
                setResult(false);
                setresultnyx(false);
                setresultdior(false);
                setresultclinique(false);
                // setResults([false, false, false]);
              }}
            />
            {query != "" && (
            <span className="Header--search--close">
              <img
                src="/assests/icons/close.png"
                alt="search"
                className="Header--close--icon"
                onClick={() => {setQuery(""); document.getElementById('search-box').value = ''}}
              />
            </span>
          )}
          </div>
          {query == "" && (
            <div className="Header--sort--container">
              <span className="Header--sort--text">Sort By</span>
              <select
                onChange={(event) => {
                  setSorter(event.target.value);
                }}
                className="Header--sort--select"
              >
                <option value="rating">Rating</option>
                <option value="price">Price</option>
              </select>
            </div>
          )}
          
        </div>{query === "" && (
          <div>
            <div className="Catalogue--brandbox">
              {brands.map((Brand) => (
                <div>
                  {Brand.name == brand && <button
                    className="Catalogue--brand Catalogue-brand-selected"
                    onClick={() => setBrand(Brand.name)}
                  >
                    {Brand.name}
                    {Brand.name == "nyx" && <span> ({productsnyx})</span>}
                    {Brand.name == "dior" && <span> ({productsdior})</span>}
                    {Brand.name == "clinique" && (
                      <span> ({productsclinique})</span>
                    )}
                  </button>}
                  {Brand.name != brand && <button
                    className="Catalogue--brand"
                    onClick={() => setBrand(Brand.name)}
                  >
                    {Brand.name}
                    {Brand.name == "nyx" && <span> ({productsnyx})</span>}
                    {Brand.name == "dior" && <span> ({productsdior})</span>}
                    {Brand.name == "clinique" && (
                      <span> ({productsclinique})</span>
                    )}
                  </button>}
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
        {query != "" && (
          <div>
            {() => setBrand("")}
            <div>
              {() => setBrand(0)}
              {brands.map((Brand) => (
                <div>
                  {/* {((Brand.id == 1 && results[0]) ||
                    (Brand.id == 2 && results[1]) ||
                    (Brand.id == 3 && results[2])) && <div>{Brand.name}</div>} */}
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
                            // if(Brand.id == 1 && results[0]){
                            //   setResult[0](true);
                            // }
                            // else if(Brand.id == 2 && results[1]){
                            //   setResult[0](true);
                            // }
                            // else if(Brand.id == 3 && results[2]){
                            //   setResult[0](true);
                            // }
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
                  <img src="/assests/svg/no-search.svg" alt="No Results" className="no-result--image"/>
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
      </div>
    </div>
  );
}

export default Catalogue;