import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { API } from "../services/api";

function TodoDetailsPage() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editProduct, setEditProduct] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTodo(data);
        setEditTitle(data.title);
        setEditProduct(data.product);
        setEditDescription(data.description);
      });
  }, [id]);

  const handleEdit = () => {
    const updatedTodo = {
      ...todo,
      title: editTitle,
      product: editProduct,
      description: editDescription,
    };

    fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodo(data);
        setShowModal(false);
      });
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{todo.title}</h1>
        <p className="mb-2">
          <strong>Product:</strong> {todo.product}
        </p>
        <p className="mb-4">
          <strong>Description:</strong> {todo.description}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 mr-2"
            onClick={() => setShowModal(true)}
          >
            Edit
          </button>
        </div>

        <Modal show={showModal} handleClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit();
              }}
              className="space-y-4"
            >
              <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                placeholder="Title"
              />
              <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                value={editProduct}
                onChange={(e) => setEditProduct(e.target.value)}
                required
                placeholder="Product"
              />
              <textarea
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
                placeholder="Description"
              />
              <div className="flex justify-end">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default TodoDetailsPage;
