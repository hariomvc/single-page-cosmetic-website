import Catalogue from "./Components/Catalogue/Catalogue";//Importing Catalogue Component
import Product from "./Components/Product/Product";//Importing Product Coomponent
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; //Importing Required items for Router Dom

function App() {
  return (
    <div>
      {/* Routing to home route by rendering Catalogue Component
      Routing to individual products page using the Product Component and passing the product id */}
      <Router>
      <Switch>
        <Route exact path="/">
        <Catalogue/>
          </Route>
          <Route path="/:id">
            <Product/>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;//Exporting APP
