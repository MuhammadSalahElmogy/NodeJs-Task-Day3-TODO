const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store todo items
let todos = [];

/**
 * GET /todos
 * Retrieves all todo items
 * Response: Array of todo objects
 */
app.get("/todos", (req, res) => {
  res.json(todos);
});

/**
 * POST /todos
 * Adds a new todo item
 * Request Body: { text: "Task description" }
 * Response: Created todo object
 */
app.post("/todos", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const newTodo = { id: todos.length + 1, text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

/**
 * PUT /todos/:id
 * Updates an existing todo item by ID
 * Request Params: id (todo item ID)
 * Request Body: { text: "Updated task description" }
 * Response: Updated todo object
 */
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "ToDo item not found" });
  }

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  todo.text = text;
  res.json(todo);
});

/**
 * DELETE /todos/:id
 * Deletes a todo item by ID
 * Request Params: id (todo item ID)
 * Response: Success message
 */
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "ToDo item not found" });
  }

  todos.splice(index, 1);
  res.json({ message: "ToDo item deleted successfully" });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
