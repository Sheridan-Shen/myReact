import styles from "./TodoList.module.css";
import { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import ClearCompletedButton from "./ClearCompletedButton";
import { useTodoStore } from "../../stores/todoStore";

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
  const {
    todos,
    loading,
    error,
    fetchTodos,
    handleToggleTodo,
    isFilter,
    setIsFilter,
    handleAddTodo,
  } = useTodoStore();

  // const {handleToggleTodo} = useTodoStore();  

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredItems = isFilter
    ? todos.filter((item) => !item.completed)
    : todos;

  console.log("filteredItems:", filteredItems);
  
  return (
    <section>
      <h1>Sally Ride 的 Todo 清单</h1>
      <label>
        <input
          type="checkbox"
          checked={isFilter}
          onChange={(e) => setIsFilter(e.target.checked)}
        />
        过滤掉已完成的待办事项
      </label>
      <label>
        <AddTodoForm addTodo={handleAddTodo} />
      </label>
      <ul>
        {filteredItems.map((item, index) => (
          <TodoItem
            key={item.id}
            {...item}
            onToggle={() => handleToggleTodo(item.id)}
          />
        ))}
      </ul>
      <ClearCompletedButton />
      {/* <Test></Test> */}
    </section>
  );
}
