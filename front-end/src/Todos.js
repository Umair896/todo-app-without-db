import React, { useState, useEffect } from "react";
import axios from "axios";

const Todos = () => {
  const [inputTodo, setInputTodo] = useState("");
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const onInputChange = (event) => {
    setInputTodo(event.target.value);
  };

  const fetchTodos = () => {
    return axios
      .get("/api/todos")
      .then((response) => {
        setTodosList(response.data.data.todos);
        console.log(response.data);
      })
      .catch((e) => console.log(e.response.data.error));
  };

  const addTodo = (e) => {
    e.preventDefault();
    axios
      .post("/api/todos", { text: inputTodo })
      .then((response) => console.log(response))
      .then(fetchTodos())
      .catch((e) => console.log(e.response.data.error));
    setInputTodo("");
  };

  const deleteTodo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then(() => console.log("Delete successful"))
      .then(fetchTodos())
      .catch((e) => console.log(e.response.data.error));
  };

  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={addTodo}>
        <input placeholder="Add todo" type="text" value={inputTodo} onChange={onInputChange} />
        <button type="submit">Add</button>
      </form>
      {!todosList.length ? (
        <p>Add todo items</p>
      ) : (
        todosList.map((todo, i) => {
          return (
            <li key={i}>
              <p style={{ display: "inline-block" }}>{todo.text}</p>
              <button onClick={() => deleteTodo(todo.id)}>delete</button>
            </li>
          );
        })
      )}
    </div>
  );
};

export default Todos;
