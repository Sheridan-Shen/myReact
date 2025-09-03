import styles from "./TodoList.module.css";
import { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import ClearCompletedButton from "./ClearCompletedButton";
import { useTodoStore } from "../../stores/todoStore";
import { useSearchParams } from "react-router";
import Pagination from "./Pagination";

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
    fetchTodosByPage,
    handleToggleTodo,
    isFilter,
    setIsFilter,
    handleAddTodo,

    page,
    limit,
    setPage,
    setLimit,
  } = useTodoStore();

  const [searchParams, setSearchParams] = useSearchParams();

  // 从 URL 读取分页参数
  useEffect(() => {
    const urlPage = parseInt(searchParams.get("page")) || 1;
    const urlLimit = parseInt(searchParams.get("limit")) || 5;

    // 同步到 store
    if (page !== urlPage) setPage(urlPage);
    if (limit !== urlLimit) setLimit(urlLimit);
  }, [searchParams, page, limit, setPage, setLimit]);

  // 同步 store 状态到 URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (page !== 1) params.set("page", page);
    if (limit !== 5) params.set("limit", limit);
    setSearchParams(params, { replace: true });
  }, [page, limit, setSearchParams]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredItems = isFilter
    ? todos.filter((item) => !item.completed)
    : todos;

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
      <Pagination
        currentPage={page}
        totalPages={999} // 无需真实值，输入框随便填都行
        limit={limit}
        onLimitChange={setLimit}
        onPageChange={setPage}
      />
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
    </section>
  );
}
