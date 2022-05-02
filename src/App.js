import Catalogue from "./Components/Catalogue/Catalogue";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function Test(){
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

function App() {
  return (
    <div>
      <Router>
      <Switch>
        <Route exact path="/">
        <Catalogue/>
          </Route>
          <Route path="/:id">
            <Test/>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
