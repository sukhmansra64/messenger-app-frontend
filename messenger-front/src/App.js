import {BrowserRouter, Switch,Route} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Index from './Pages/Index'

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route
              path="/"
              component={Index}
              exact
          />
          <Route
              path="/login"
              component={Login}
              exact
          />
          <Route path="/register" component={Register} exact />
          <Route
              path="/dashboard"
              component={Dashboard}
              exact
          />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
