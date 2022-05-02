import Catalogue from "./Components/Catalogue/Catalogue";
import Product from "./Components/Product/Product";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function App() {
  return (
    <div>
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

export default App;
