import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

const TodoTable = ({ todos, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr className={styles.table_row}>
            <th>Title</th>
            <th>UserId</th>
            <th>Complete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} className={styles.table_row}>
              <td>{todo.title}</td>
              <td>{todo.userId}</td>
              <td>
                <input type="checkbox" readOnly checked={todo.completed} />
              </td>
              <td>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/form/${todo.id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(todo.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { TodoTable };
