const express = require("express");
const app = express();
const port = 3001;

const db = {
  todos: [{ id: 1, text: "Buy groceries", isDone: false }],
};
let newId = 2;

app.use(express.json());

app.get("/api/todos", (req, res) => {
  res.json({ todos: db.todos });
});

app.post("/api/todos", (req, res) => {
  let attrs = req.body.todo;
  attrs.id = newId;
  newId++;
  db.todos.push(attrs);
  res.json({ todo: attrs });
});

app.patch("/api/todos/:id", (req, res) => {
  let newAttrs = req.body.todo;
  let changedIndex = db.todos.findIndex((todo) => +todo.id === +req.params.id);
  db.todos = db.todos.map((oldTodo, i) =>
    i === changedIndex ? newAttrs : oldTodo
  );
  res.json({ todo: newAttrs });
});

app.delete("/api/todos/:id", (req, res) => {
  db.todos = db.todos.filter((todo) => +todo.id !== +req.params.id);

  res.status(204).end();
});

app.listen(port);
