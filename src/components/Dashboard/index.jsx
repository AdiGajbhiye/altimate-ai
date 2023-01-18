import "./style.css";
import { fetchTodos, postTodo } from "../../services/http";
import { useEffect, useState } from "react";
import TodoTable from "../TodoTable";
import TodoForm from "../TodoForm";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [todoForm, setTodoForm] = useState({
    title: "",
    userId: "",
    completed: false,
  });

  useEffect(() => {
    fetchTodos().then((_todos) => setTodos(_todos));
  }, []);

  const onSubmitTodo = async (values) => {
    if (typeof values.id === "undefined") {
      const todo = await postTodo(values);
      setTodos((_todos) => [..._todos, todo]);
      return;
    }
    setTodos((_todos) =>
      _todos.map((todo) => (todo.id === values.id ? values : todo))
    );
  };

  const editTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    setTodoForm(todo);
  };

  const deleteTodo = (id) => {
    setTodos((_todos) => _todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <TodoTable todos={todos} onEdit={editTodo} onDelete={deleteTodo} />
      <TodoForm todo={todoForm} onSubmit={onSubmitTodo} />
    </div>
  );
};

export default Dashboard;
