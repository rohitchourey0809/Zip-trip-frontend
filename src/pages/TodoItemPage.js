import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../services/api";
import "./TodoItemPage.css";

function TodoItemPage() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/${id}`)
      .then((response) => {
        setTodo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="todo-container">
      <img src={todo.image} alt={todo.title} />
      <div className="todo-details">
        <h1>{todo.title}</h1>
        <p>{todo.description}</p>
        <p>Price: ${todo.price}</p>
        <p>Category: {todo.category}</p>
        <p>
          Rating: {todo.rating.rate} (based on {todo.rating.count} reviews)
        </p>
      </div>
    </div>
  );
}

export default TodoItemPage;
