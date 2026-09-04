const express = require("express");

const router = express.Router();

const { createTodo, getTodos, getTodoById, updateTodo,deleteTodo } = require("../controllers/todoController");

// CREATE todo
router.post("/", createTodo);

// GET all todos
router.get("/", getTodos);

// GET by id
router.get("/:id",getTodoById)

// Update
router.put("/:id", updateTodo);

// delete
router.delete("/:id", deleteTodo);

module.exports = router;