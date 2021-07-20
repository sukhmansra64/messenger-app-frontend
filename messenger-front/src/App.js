import {BrowserRouter, Switch,Route} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/register'>
          <Register/>
        </Route>
        <Route path='/dashboard'>
          <Dashboard/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
