import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TodoContext } from "../Layout";
import "./style.css";

const TodoForm2 = ({ todoForm, onSubmit }) => {
  const [todo, setTodo] = useState(todoForm);

  const { title, userId, completed } = todo;

  const setTitle = (v) => setTodo((t) => ({ ...t, title: v }));
  const setUserId = (v) => setTodo((t) => ({ ...t, userId: v }));
  const setCompleted = () =>
    setTodo((t) => ({ ...t, completed: !t.completed }));

  return (
    <form
      className="todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(todo);
      }}
    >
      <label className="todo-form-input">
        <span className="todo-form-label">Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="todo-form-input">
        <span className="todo-form-label">UserId</span>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <label className="todo-form-input">
        <span className="todo-form-label">Completed</span>
        <input type="checkbox" checked={completed} onChange={setCompleted} />
      </label>

      <input type="submit" className="submit-button" value="SUBMIT" />
    </form>
  );
};

const TodoForm = () => {
  const { todoId } = useParams();
  const { todos, addTodo, editTodo } = useContext(TodoContext);

  const { todo, onSubmit } = useMemo(() => {
    const defaultForm = {
      todo: {
        title: "",
        userId: "",
        completed: false,
      },
      onSubmit: addTodo,
    };

    // show add todo form
    if (typeof todoId === "undefined") return defaultForm;

    const _todoId = parseInt(todoId);
    // if param is not an integer, then show add todo form
    if (isNaN(_todoId)) return defaultForm;

    const _todo = todos.find((todo) => todo.id === _todoId);
    // if unable to find todo in list, then show add todo form
    if (!_todo) return defaultForm;

    // show edit todo form
    return { todo: _todo, editTodo };
  }, [todoId, todos, addTodo, editTodo]);

  return (
    <div className="container">
      <h2>Todo Form</h2>
      <TodoForm2 todoForm={todo} onSubmit={onSubmit} />
    </div>
  );
};

export { TodoForm };
