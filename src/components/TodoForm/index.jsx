import { useEffect, useState } from "react";
import "./style.css";

const TodoForm = ({ todo, onSubmit }) => {
  const [_todo, _setTodo] = useState(todo);
  useEffect(() => _setTodo(todo), [todo]);

  const { title, userId, completed } = _todo;
  const setTitle = (v) => _setTodo((t) => ({ ...t, title: v }));
  const setUserId = (v) => _setTodo((t) => ({ ...t, userId: v }));
  const setCompleted = () =>
    _setTodo((t) => ({ ...t, completed: !t.completed }));

  return (
    <div className="container">
      <h2>Todo Form</h2>
      <form
        className="todo-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(_todo);
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
    </div>
  );
};

export default TodoForm;
