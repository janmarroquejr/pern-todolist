import React, { Fragment } from "react";

export default function Login({ setAuth }) {
  return (
    <Fragment>
      <h1>LOGIN</h1>
      <button onClick={() => setAuth(true)}>Authenticate</button>
    </Fragment>
  );
}
