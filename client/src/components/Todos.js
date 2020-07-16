import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";

export default function ListTodo({ setAuth }) {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const url = "http://localhost:5000/todos";

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(url + `/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  let todoList;

  if (todos.length === 0) {
    todoList = (
      <tr>
        <td colSpan="2">Nothing to display</td>
      </tr>
    );
  } else {
    todoList = todos.map((todo, index) => {
      return (
        <tr key={todo.todo_id}>
          <th>{++index}</th>
          <td>{todo.description}</td>
          <td>
            <EditTodo todo={todo} />
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => deleteTodo(todo.todo_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <Fragment>
      <h2>Hello {name}!</h2>
      <button className="btn btn-danger" onClick={(e) => logout(e)}>
        Log Out
      </button>
      <InputTodo />
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Todo</th>
          </tr>
        </thead>
        <tbody>{todoList}</tbody>
      </table>
    </Fragment>
  );
}
