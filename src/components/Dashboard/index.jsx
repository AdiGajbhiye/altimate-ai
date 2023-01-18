import "./style.css";
import { fetchTodos, postTodo } from "../../services/http";
import { useEffect, useState } from "react";
import TodoTable from "../TodoTable";
import TodoForm from "../TodoForm";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then((_todos) => setTodos(_todos));
  }, []);

  const newTodo = async (values) => {
    if (!values.id) {
      const todo = await postTodo(values);
      setTodos((_todos) => [..._todos, todo]);
      return;
    }
  };

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <TodoTable todos={todos} />
      <TodoForm onSubmit={newTodo} />
    </div>
  );
};

export default Dashboard;
