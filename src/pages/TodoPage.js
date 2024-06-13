import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`${API}`)
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { title, product, description };
    fetch(`${API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        setTitle("");
        setProduct("");
        setDescription("");
        // Show success toast
        toast.success("Todo added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        // Show error toast if needed
        toast.error("Failed to add todo. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleDelete = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => {
      toast.success("Todo Item Deleted Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side: Form */}
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">Add Todo</h1>
          <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="text"
              placeholder="Product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 w-full"
            >
              Add Todo
            </button>
          </form>
        </div>

        {/* Right Side: Todo List */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white shadow-md rounded p-4 flex justify-between items-center transition hover:shadow-lg"
            >
              <Link
                to={`/todo/${todo.id}`}
                className="text-blue-500 hover:text-blue-600 transition"
              >
                {todo.title}
              </Link>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodosPage;
