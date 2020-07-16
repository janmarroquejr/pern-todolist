import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Todos from "./components/Todos";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      parseRes ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Fragment>
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                isAuthenticated ? (
                  <Todos {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
