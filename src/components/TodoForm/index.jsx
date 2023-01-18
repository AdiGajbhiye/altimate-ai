import { useState } from "react";
import "./style.css";

const TodoForm = (props) => {
  const [title, setTitle] = useState(props.title || "");
  const [userId, setUserId] = useState(props.userId || "");
  const [completed, setCompleted] = useState(props.completed || false);
  return (
    <div className="container">
      <h2>New Todo</h2>
      <form
        className="todo-form"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit({ title, userId, completed });
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
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted((b) => !b)}
          />
        </label>

        <input
          type="submit"
          className="submit-button"
          value="Create new todo"
        />
      </form>
    </div>
  );
};

export default TodoForm;
