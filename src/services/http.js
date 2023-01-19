export const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return await response.json();
};

export const postTodo = async (data) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    data,
  });
  const result = await response.json();
  return { ...data, ...result };
};
