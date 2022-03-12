const bodyParser = require("body-parser");
const express = require("express");
const todosRouter = require("./src/resources/todos/todos.router");

const app = express();

app.use(bodyParser.json());
app.use("/api/todos", todosRouter);

const PORT = 7000;
app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
