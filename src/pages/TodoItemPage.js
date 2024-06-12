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

  if (loading) return <div className="todo-loading">Loading...</div>;
  if (error) return <div className="todo-error">{error}</div>;

  return (
    <div className="todo-container">
      <div className="todo-image-container">
        <img src={todo.image} alt={todo.title} className="todo-image" />
      </div>
      <div className="todo-details">
        <h1 className="todo-title">{todo.title}</h1>
        <p className="todo-description">{todo.description}</p>
        <div className="todo-info">
          <p className="todo-price">Price: ${todo.price}</p>
          <p className="todo-category">Category: {todo.category}</p>
          <p className="todo-rating">
            Rating: {todo.rating.rate} (based on {todo.rating.count} reviews)
          </p>
        </div>
      </div>
    </div>
  );
}

export default TodoItemPage;
