const todos = [];

const getTodos = (req, res) => {
  return res.status(200).json({
    success: true,
    error: null,
    data: {
      todos: todos,
    },
  });
};

const postTodo = (req, res) => {
  const text = req.body.text;
  if (!text) {
    return res.status(400).json({
      success: false,
      error: "Please provide the todo",
      data: null,
    });
  }

  const newTodo = {
    id: todos.length + 1,
    text: text,
  };

  todos.push(newTodo);

  res.status(201).json({
    success: true,
    error: null,
    data: {
      todos: newTodo,
    },
  });
};

const deleteTodo = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(500).json({
      success: false,
      error: "Please provide id",
      data: null,
    });
  }

  const findTodo = todos.findIndex((todo) => todo.id == id);
  todos.splice(findTodo, 1);
  return res.send();
};

module.exports = {
  getTodos,
  postTodo,
  deleteTodo,
};
