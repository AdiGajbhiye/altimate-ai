import { useEffect, useState } from "react";
import { fetchTodos } from "../../services/http";
import "./style.css";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then((_todos) => setTodos(_todos));
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="text-start">Title</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr>
              <td className="text-start">{todo.title}</td>
              <td>
                <input type="checkbox" checked={todo.completed} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
