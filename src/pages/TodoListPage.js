// src/pages/TodoListPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../services/api";
import "./TodoListPage.css"

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}`)
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {todos?.map((todo) => (
          <div key={todo.id} className="card">
            <Link
              to={`/todo/${todo.id}`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img src={todo.image} alt={todo.title} className="card-img" />
              <div className="card-content">
                <h3 className="card-title">{todo.title}</h3>
                <p className="card-text">Price: ${todo.price}</p>
                <p className="card-text">Category: {todo.category}</p>
                <p className="card-text">
                  Rating: {todo.rating.rate} (based on {todo.rating.count}{" "}
                  reviews)
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoListPage;
