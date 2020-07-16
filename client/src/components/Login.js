import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { email, password };
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);

      setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center">LOGIN</h1>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="email">E-mail: </label>
        <input
          type="email"
          className="form-control mb-2"
          name="email"
          id="email"
          onChange={(e) => onChange(e)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          className="form-control mb-2"
          name="password"
          id="password"
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-primary btn-block">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  );
}
