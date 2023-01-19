import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TodoContext } from "../Layout";
import styles from "./style.module.css";

const TodoForm2 = ({ todoForm, onSubmit }) => {
  const [todo, setTodo] = useState(todoForm);

  const { title, userId, completed } = todo;

  const setTitle = (v) => setTodo((t) => ({ ...t, title: v }));
  const setUserId = (v) => setTodo((t) => ({ ...t, userId: v }));
  const setCompleted = () =>
    setTodo((t) => ({ ...t, completed: !t.completed }));

  return (
    <form
      className={styles.todo_form}
      onSubmit={(e) => {
        e.preventDefault();
        const _userId = parseInt(userId);
        if (isNaN(_userId)) return;
        onSubmit({ ...todo, userId: _userId });
      }}
    >
      <label className={styles.form_container}>
        <span className={styles.form_label}>Title</span>
        <input
          className={styles.form_input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className={styles.form_container}>
        <span className={styles.form_label}>UserId</span>
        <input
          className={styles.form_input}
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <label className={styles.form_container}>
        <span className={styles.form_label}>Completed</span>
        <input
          className={styles.form_input}
          type="checkbox"
          checked={completed}
          onChange={setCompleted}
        />
      </label>

      <input type="submit" className={styles.submit_button} value="SUBMIT" />
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
    return { todo: _todo, onSubmit: editTodo };
  }, [todoId, todos, addTodo, editTodo]);

  return (
    <div className={styles.container}>
      <h2>Todo Form</h2>
      <TodoForm2 key={todoId} todoForm={todo} onSubmit={onSubmit} />
    </div>
  );
};

export { TodoForm };
