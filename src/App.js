// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodosPage from "./pages/TodoPage";
import TodoDetailsPage from "./pages/TodosDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/todo/:id" element={<TodoDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
