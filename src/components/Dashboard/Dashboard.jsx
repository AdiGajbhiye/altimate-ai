import "./style.css";
import { useContext, useMemo, useState } from "react";
import TodoTable from "../TodoTable";
import { TodoContext } from "../Layout";

const Dashboard = () => {
  const { todos, deleteTodo } = useContext(TodoContext);
  const [filter, setFilter] = useState({
    filterByUserId: false,
    filterByCompleted: false,
    userId: "",
    completed: false,
  });

  const filteredtodos = useMemo(() => {
    let _filteredtodos = todos;
    if (filter.filterByUserId) {
      const _userId = parseInt(filter.userId);
      if (!isNaN(_userId)) {
        _filteredtodos = _filteredtodos.filter((t) => t.userId === _userId);
      }
    }
    if (filter.filterByCompleted) {
      _filteredtodos = _filteredtodos.filter(
        (t) => t.completed === filter.completed
      );
    }
    return _filteredtodos;
  }, [todos, filter]);

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div>
        <span>Filter</span>
        <label>
          <span>By userId</span>
          <input
            type="checkbox"
            checked={filter.filterByUserId}
            onChange={() =>
              setFilter((f) => ({ ...f, filterByUserId: !f.filterByUserId }))
            }
          />
        </label>
        <label>
          <span>UserId</span>
          <input
            type="text"
            checked={filter.userId}
            disabled={!filter.filterByUserId}
            onChange={(e) =>
              setFilter((f) => ({ ...f, userId: e.target.value }))
            }
          />
        </label>
        <label>
          <span>By completed</span>
          <input
            type="checkbox"
            checked={filter.filterByCompleted}
            onChange={() =>
              setFilter((f) => ({
                ...f,
                filterByCompleted: !f.filterByCompleted,
              }))
            }
          />
        </label>
        <label>
          <span>Completed</span>
          <input
            type="checkbox"
            checked={filter.completed}
            disabled={!filter.filterByCompleted}
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
