import React, { Fragment } from "react";
import "./App.css";
import Todos from "./components/Todos";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/" render={(props) => <Todos {...props} />} />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            />

            <Route
              exact
              path="/register"
              render={(props) => <Register {...props} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
