import { useEffect, useState } from "react";
import "./App.css";

// const API_URL = "http://localhost:5000/api/todos";

const API_URL = "https://project1-todo-g5ew.onrender.com/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Get all todos
const getTodos = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log("API Response:", data);

    setTodos(data.todos || []);
  } catch (error) {
    console.error("Error fetching todos:", error);
    setTodos([]);
  }
};

  useEffect(() => {
    getTodos();
  }, []);

  // Add or Update Todo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a todo");
      return;
    }

    try {
      // UPDATE TODO
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
          }),
        });

        setEditingId(null);
      }

      // CREATE TODO
      else {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
          }),
        });
      }

      setTitle("");

      // Refresh todo list
      getTodos();

    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Edit Todo
  const handleEdit = (todo) => {
    setTitle(todo.title);
    setEditingId(todo.id);
  };

  // Delete Todo
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      getTodos();

    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="app">
      <div className="todo-container">

        <h1>📝 My Todo List</h1>

        <p className="subtitle">
          Organize your tasks and stay productive
        </p>

        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            placeholder="Enter a new todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button type="submit" className="add-btn">
            {editingId ? "Update Todo" : "Add Todo"}
          </button>
        </form>

        <div className="todo-list">

          {todos.map((todo) => (
            <div className="todo-item" key={todo.id}>

              <span>{todo.title}</span>

              <div className="buttons">

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default App;