import "./style.css";
import { fetchTodos, postTodo } from "../../services/http";
import { useEffect, useState } from "react";
import TodoTable from "../TodoTable";
import TodoForm from "../TodoForm";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [filteredtodos, setFilteredTodos] = useState([]);
  const [todoForm, setTodoForm] = useState({
    title: "",
    userId: "",
    completed: false,
  });
  const [filter, setFilter] = useState({
    isFilter: false,
    userId: "",
    completed: false,
  });

  useEffect(() => {
    fetchTodos().then((_todos) => {
      setTodos(_todos);
      setFilteredTodos(_todos);
    });
  }, []);

  useEffect(() => {
    if (!filter.isFilter) return;
    setFilteredTodos(
      todos.filter(
        (t) => t.completed === filter.completed || t.userId === filter.userId
      )
    );
  }, [todos, filter]);

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
      <div>
        <span>Filter by</span>
        <label>
          <span>IsFiter</span>
          <input
            type="checkbox"
            checked={filter.isFilter}
            onChange={() => setFilter((f) => ({ ...f, isFilter: !f.isFilter }))}
          />
        </label>
        <label>
          <span>UserId</span>
          <input
            type="text"
            checked={filter.userId}
            disabled={!filter.isFilter}
            onChange={(e) =>
              setFilter((f) => ({ ...f, userId: e.target.value }))
            }
          />
        </label>
        <label>
          <span>Completed</span>
          <input
            type="checkbox"
            checked={filter.completed}
            disabled={!filter.isFilter}
            onChange={() =>
              setFilter((f) => ({ ...f, completed: !f.completed }))
            }
          />
        </label>
      </div>
      <TodoTable
        todos={filteredtodos}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
      <TodoForm todo={todoForm} onSubmit={onSubmitTodo} />
    </div>
  );
};

export default Dashboard;
