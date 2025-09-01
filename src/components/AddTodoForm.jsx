import { useState } from "react";
import { useTodoListStore } from "../stores/todoListStore";
import styles from "./TodoList.module.css";

export default function AddTodoForm() {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodoListStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="请输入新的待办事项"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        添加
      </button>
    </form>
  )
}