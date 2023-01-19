import "./style.css";
import { useContext, useMemo, useState } from "react";
import TodoTable from "../TodoTable";
import { TodoContext } from "../Layout";

const Dashboard = () => {
  const { todos, deleteTodo } = useContext(TodoContext);
  const [filter, setFilter] = useState({
    isFilter: false,
    userId: "",
    completed: false,
  });

  const filteredtodos = useMemo(() => {
    if (!filter.isFilter) return todos;
    return todos.filter(
      (t) => t.completed === filter.completed || t.userId === filter.userId
    );
  }, [todos, filter]);

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
      <TodoTable todos={filteredtodos} onDelete={deleteTodo} />
    </div>
  );
};

export { Dashboard };
