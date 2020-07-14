import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

export default function ListTodo() {
  const [todos, setTodos] = useState([]);
  const url = "http://localhost:5000/todos";
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
      const deleteTodo = await fetch(url + `/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id != id));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  let todoList = todos.map((todo, index) => {
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

  return (
    <Fragment>
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
