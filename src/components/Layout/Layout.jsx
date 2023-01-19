import { createContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchTodos, postTodo } from "../../services/http";
import { useEffectOnce } from "../../utils/helper";
import { Header } from "../Header";

const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
});

const Layout = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  useEffectOnce(() => {
    fetchTodos().then((_todos) => {
      setTodos(_todos);
    });
  }, []);

  const addTodo = async (values) => {
    const todo = await postTodo(values);
    setTodos((_todos) => [..._todos, todo]);
    navigate("/dashboard");
  };

  const editTodo = async (values) => {
    setTodos((_todos) =>
      _todos.map((todo) => (todo.id === values.id ? values : todo))
    );
    navigate("/dashboard");
  };

  const deleteTodo = (id) => {
    setTodos((_todos) => _todos.filter((todo) => todo.id !== id));
    navigate("/dashboard");
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo }}>
      <div className="container">
        <Header />
        {todos.length === 0 && <div>Loading...</div>}
        {todos.length > 0 && <Outlet />}
      </div>
    </TodoContext.Provider>
  );
};

export { Layout, TodoContext };
