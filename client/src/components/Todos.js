import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";
import { toast } from "react-toastify";

export default function ListTodo({ setAuth }) {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const url = "http://localhost:5000/home";

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/home/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      setName(parseRes[0].user_name);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
    console.log(todos);
  }, []);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(url + `/todos/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      toast.success(response.json());

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  let todoList;

  if (todos.length === 0 || todos[0].todo_id === null) {
    todoList = (
      <tr>
        <td colSpan="3">Nothing to display</td>
      </tr>
    );
  } else {
    todoList = todos.map((todo, index) => {
      return (
        <tr key={todo.todo_id}>
          <th>{++index}</th>
          <td>{todo.description}</td>
          <td>{todo.user_name}</td>
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
    toast.success("Logged out successfully!");
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
            <th>User</th>
          </tr>
        </thead>
        <tbody>{todoList}</tbody>
      </table>
    </Fragment>
  );
}
