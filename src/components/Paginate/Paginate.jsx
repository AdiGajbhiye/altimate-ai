import { useContext, useMemo, useState } from "react";
import { TodoContext } from "../Layout";
import { TodoTable } from "../TodoTable";
import "./style.css";

const PAGE_LIMIT = 10;

const Paginate = () => {
  const { todos, onDelete } = useContext(TodoContext);
  const [filter, setFilter] = useState("");
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => todo.title.includes(filter));
  }, [todos, filter]);
  const [page, setPage] = useState(0);
  return (
    <div className="container">
      <h1>Paginate</h1>
      <div className="paginate">
        <button
          onClick={(e) => {
            e.preventDefault();
            setPage((p) => (p > 0 ? p - 1 : p));
          }}
        >
          Previous
        </button>
        <div>Page {page + 1}</div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setPage((p) =>
              p < Math.floor(filteredTodos.length / PAGE_LIMIT) ? p + 1 : p
            );
          }}
        >
          Next
        </button>
      </div>
      <label>
        Filter by title
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </label>
      <TodoTable
        todos={filteredTodos.slice(page, page + PAGE_LIMIT)}
        onDelete={onDelete}
      />
    </div>
  );
};

export { Paginate };
