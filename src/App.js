import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import TodoForm from "./components/TodoForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new" element={<TodoForm />} />
        </Routes>
      </BrowserRouter>
      <Outlet />
    </>
  );
}

export default App;
