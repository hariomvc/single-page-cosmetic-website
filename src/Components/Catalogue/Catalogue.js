import "./Catalogue.css"; // Importing CSS File for Catalogue Page
import { useEffect, useState } from "react"; //Importing UseState and UseEffect from react
import Card from "./Card/Card"; //Importing the Card Component
import Loader from "./Loader/Loader"; //Importing the Loader Cosmponent

function Catalogue() {
  // Array with Brand Detials theirn APIs and Name
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

  //State Variable for Brand
  const [brand, setBrand] = useState("");

  //State Variable for Sorting Process
  const [sorter, setSorter] = useState("");

  //State Variable for Checking Status for Loader, to show it or not
  const [loaded, setLoaded] = useState(false);

  //State Variable for Array of Products fetched from APIs, all the products will be stored in this variable and the rendered accordingly
  const [products, setProducts] = useState([]);

  //State Variables for Setting the Count of Products of Different Brand
  const [productsnyx, setProductsnyx] = useState(0);
  const [productsdior, setProductsdior] = useState(0);
  const [productsclinique, setProductsclinique] = useState(0);

  //Function to Fetch Data from APIs
  const fetchData = () => {
    let url = "";
    //Looping over brands, fetch data from each brand's API and adding it to Products. Also counting the Products in each brnad and setting the respective Variables
    brands.forEach(function (Brand) {
      url = Brand.api;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let newdata = products;
          data.map((product) => newdata.push(product));
          if (Brand.name === "nyx") {
            setProductsnyx(data.length);
            setProducts(newdata);
          } else if (Brand.name === "dior") {
            setProductsdior(data.length);
            setProducts(newdata);
          } else if (Brand.name === "clinique") {
            setProductsclinique(data.length);
            setProducts(newdata);
          }
        });
    });
  };

  //State Variable for Search Query. It will be updated if user types something in Search
  const [query, setQuery] = useState("");

  //State Variable for Result, and also for result of each brand to check if any product is found for the search query.
  const [result, setResult] = useState(false);
  const [resultnyx, setresultnyx] = useState(false);
  const [resultdior, setresultdior] = useState(false);
  const [resultclinique, setresultclinique] = useState(false);

  //Use Effect
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {/* Main Container */}
      <div className="Catalogue--container">
        {/* Container for Items Fixed at Top */}
        <div className="fixed-top">
          {/* Container for Header */}
          <div className="Header--container">
            {/* Container for Search */}
            <div className="Header--search--container">
              {/* Search Image and Input Field */}
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
                }}
                // Query State Variable is set when something is changed
              />
              {/* Displaying the Clsoe button during Search */}
              {query != "" && (
                <span className="Header--search--close">
                  <img
                    src="/assests/icons/close.png"
                    alt="search"
                    className="Header--close--icon"
                    onClick={() => {
                      setQuery("");
                      document.getElementById("search-box").value = "";
                    }}
                  />
                </span>
              )}
            </div>
            {/* The Sorting Options, hidden during search */}
            {query == "" && (
              <div className="Header--sort--container">
                <span className="Header--sort--text">Sort By</span>
                <select
                  onChange={(event) => {
                    setSorter(event.target.value);
                  }}
                  className="Header--sort--select"
                >
                  <option selected disabled>
                    Choose one
                  </option>
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                </select>
              </div>
            )}
          </div>
          {/* Rendering the Tab view is there is no search being done */}
          {query === "" && (
            <div>
              <div className="Catalogue--brandbox">
                {brands.map((Brand) => (
                  <div>
                    {/* Displaying the Selected Brand with extra CSS Class to highlight it. */}
                    {Brand.name == brand && (
                      <button
                        className="Catalogue--brand Catalogue-brand-selected"
                        onClick={() => setBrand(Brand.name)}
                      >
                        {Brand.name}
                        {Brand.name == "nyx" && <span> ({productsnyx})</span>}
                        {Brand.name == "dior" && <span> ({productsdior})</span>}
                        {Brand.name == "clinique" && (
                          <span> ({productsclinique})</span>
                        )}
                      </button>
                    )}
                    {Brand.name != brand && (
                      <button
                        className="Catalogue--brand"
                        onClick={() => setBrand(Brand.name)}
                      >
                        {Brand.name}
                        {Brand.name == "nyx" && <span> ({productsnyx})</span>}
                        {Brand.name == "dior" && <span> ({productsdior})</span>}
                        {Brand.name == "clinique" && (
                          <span> ({productsclinique})</span>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Displaying Loader if no products are rendered */}
        {!loaded && <Loader />}
        {/* Displaying the Products in Accordian View when a search is being made. */}
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
                            if (!loaded) {
                              setLoaded(true);
                            }
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
                            {() => setLoaded(true)}
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
                                id={product.id}
                              />
                            )}
                          </div>
                        ))}
                  </div>
                </div>
              ))}
              {/* Displayng no-result-found SVG if no results are found. */}
              {!result && (
                <div className="no-result--container">
                  <img
                    src="/assests/svg/no-search.svg"
                    alt="No Results"
                    className="no-result--image"
                  />
                  <span className="no-result--text">No Results Found.</span>
                  <span className="no-result--text">
                    We can't find any matches for "{query}".
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Displaying the Products under Tab View, Also sorting them if required and Display a specific brnad's Product if required */}
        {query === "" && (
          <div className="Catalogue--grid">
            {products.length > 0 &&
              products
                .filter((product) => {
                  if (!loaded) {
                    setLoaded(true);
                  }
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
                  <div>
                    {() => setLoaded(true)}
                    <Card
                      brand={product.brand}
                      name={product.name}
                      price={product.price}
                      image={product.image_link}
                      link={product.product_link}
                      description={product.description}
                      rating={product.rating}
                      currency={product.price_sign}
                      id={product.id}
                    />
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalogue; //Exporting the Catalogue Component
