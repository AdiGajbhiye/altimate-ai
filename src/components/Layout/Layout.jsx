import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchTodos, postTodo } from "../../services/http";
import { Header } from "../Header";

const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
});

const Layout = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos().then((_todos) => {
      setTodos(_todos);
    });
  }, []);

  const addTodo = async (values) => {
    const todo = await postTodo(values);
    setTodos((_todos) => [..._todos, todo]);
  };

  const editTodo = async (values) => {
    setTodos((_todos) =>
      _todos.map((todo) => (todo.id === values.id ? values : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((_todos) => _todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo }}>
      <div className="container">
        <Header />
        {todos.length > 0 && <Outlet />}
      </div>
    </TodoContext.Provider>
  );
};

export { Layout, TodoContext };
