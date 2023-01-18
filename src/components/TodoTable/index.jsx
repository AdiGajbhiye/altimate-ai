const TodoTable = ({ todos, onEdit, onDelete }) => {
  return (
    <div className="container">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="text-start">Title</th>
            <th>UserId</th>
            <th>Complete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="text-start">{todo.title}</td>
              <td>{todo.userId}</td>
              <td>
                <input type="checkbox" readOnly checked={todo.completed} />
              </td>
              <td>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit(todo.id);
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

export default TodoTable;
