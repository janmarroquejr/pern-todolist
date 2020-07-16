import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered Successfully!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">REGISTER</h1>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control mb-2"
          placeholder="What is your name?"
          value={name}
          onChange={(e) => onChange(e)}
        />

        <label htmlFor="email">E-mail: </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control mb-2"
          placeholder="What is your e-mail address?"
          value={email}
          onChange={(e) => onChange(e)}
        />

        <label htmlFor="password">E-mail: </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control mb-2"
          placeholder="Input desired password"
          onChange={(e) => onChange(e)}
        />

        <button className="btn btn-success btn-block">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </Fragment>
  );
}
