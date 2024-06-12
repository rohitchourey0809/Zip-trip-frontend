// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";
import TodoItemPage from "./pages/TodoItemPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/todo/:id" element={<TodoItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
