import { useTodoListStore } from "../stores/todoListStore";
import styles from "./TodoList.module.css";

export default function ClearCompletedButton() {
  const { completedCount, clearCompleted } = useTodoListStore();

  if (completedCount === 0) return null;

  return (
    <button
      type="button"
      className={styles.clearButton}
      onClick={clearCompleted}
    >
      清除已完成的（{completedCount}）
    </button>
  );
}
