import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { BarChart } from "./components/Chart";
import { Dashboard } from "./components/Dashboard";
import { Layout } from "./components/Layout";
import { Paginate } from "./components/Paginate";
import { TodoForm } from "./components/TodoForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="form/:todoId" element={<TodoForm />} />
            <Route path="form" element={<TodoForm />} />
            <Route path="chart" element={<BarChart />} />
            <Route path="paginate" element={<Paginate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
