import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { useEffectOnce } from "../../utils/helper";
import { TodoContext } from "../Layout";
import styles from "./style.module.css";

const BarChart = () => {
  const ref = useRef();
  const [chart, setChart] = useState(null);
  const { todos } = useContext(TodoContext);
  const defaultFilter = useMemo(() => {
    const _defaultFilter = {};
    todos.forEach((todo) => {
      if (!_defaultFilter[todo.userId]) _defaultFilter[todo.userId] = true;
    });
    return _defaultFilter;
  }, [todos]);

  const [filter, setFilter] = useState(defaultFilter);

  const titleMap = useMemo(() => {
    const _titleMap = {};
    todos.forEach((todo) => {
      if (!_titleMap[todo.userId]) _titleMap[todo.userId] = [];
      _titleMap[todo.userId].push(todo.title);
    });
    return _titleMap;
  }, [todos]);

  useEffectOnce(() => {
    Chart.register(...registerables);
    const _chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: [],
        datasets: [{ label: "Todo count", data: [] }],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: { label: (context) => titleMap[context.label] },
          },
        },
      },
    });
    setChart(_chart);
  });

  useEffect(() => {
    if (!chart) return;
    const countMap = {};
    todos.forEach((todo) => {
      if (!todo.completed || !filter[todo.userId]) return;
      if (!countMap[todo.userId]) countMap[todo.userId] = 0;
      countMap[todo.userId]++;
    });
    chart.data.labels = Object.keys(countMap);
    chart.data.datasets[0].data = Object.values(countMap);
    chart.update();
  }, [todos, chart, filter]);

  return (
    <div className={styles.page}>
      <h2>Chart</h2>
      <div className={styles.container}>
        <canvas ref={ref} id="mychart" />
        <div>
          <div>Filter By</div>
          {Object.keys(filter).map((userId) => (
            <div key={userId}>
              <input
                type="checkbox"
                checked={filter[userId]}
                onChange={() =>
                  setFilter((_filter) => ({
                    ..._filter,
                    [userId]: !_filter[userId],
                  }))
                }
              />
              {userId}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { BarChart };
