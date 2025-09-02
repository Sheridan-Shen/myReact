import { useTodoStore } from "../../stores/todoStore";
import styles from "./TodoList.module.css";

export default function ClearCompletedButton() {
  const { clearCompleted, todos } = useTodoStore();
  const completedCount = todos.filter((todo) => todo.completed).length;

  if (completedCount === 0) return null;

  return (
    <button
      type="button"
      className={styles.clearButton}
      onClick={clearCompleted}
    >
      清除已完成的Todo（{completedCount}）
    </button>
  );
}
