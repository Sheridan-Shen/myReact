import todoItems from "../todoItems.json";
import styles from "./TodoList.module.css";
import { useState } from "react";

function TodoItem({ title, completed, onToggle }) {
  // 使用 CSS 模块动态生成 className
  const itemClassName = `${styles.item} ${completed ? styles.checked : ""}`;

  return (
    <li className={itemClassName}>
      <label>
        <input type="checkbox" checked={completed} onChange={onToggle} />
        {completed ? title + " ✅ " : title}
      </label>
    </li>
  );
}
export default function TodoList() {
  const [todos, setTodos] = useState(todoItems);
  const [isFilter, setIsFilter] = useState(false);

  const filteredItems = isFilter
    ? todos.filter((item) => !item.completed)
    : todos;

  const handleItemToggle = (item) => {
    console.log(item);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  return (
    <section>
      <h1>Sally Ride 的 Todo 清单</h1>
      <label>
        <input
          type="checkbox"
          checked={isFilter}
          onChange={() => setIsFilter(!isFilter)}
        />
        过滤掉已完成的待办事项
      </label>
      <ul>
        {filteredItems.map((item, index) => (
          <TodoItem
            key={index}
            {...item}
            onToggle={() => handleItemToggle(item)}
          />
        ))}
      </ul>
    </section>
  );
}
