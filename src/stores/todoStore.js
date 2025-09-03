import { create } from "zustand";
import api from "../services/api";

export const useTodoStore = create((set, get) => ({
  todos: [],
  isFilter: false,
  loading: false,
  error: null,

  // 分页状态（1-based）
  page: 1,
  limit: 5,

  // 设置分页并重新加载
  setPage: (page) => {
    set({ page });
    get().fetchTodosByPage();
  },
  setLimit: (limit) => {
    set({ limit, page: 1 }); // 切换 limit 回到第一页
    get().fetchTodosByPage();
  },

    // 获取数据
  fetchTodosByPage: async () => {
    const { page, limit } = get();
    set({ loading: true, error: null });
    try {
      const data = await api.get("/todos", {
        params: { page, limit },
      });
      // 假设后端返回的是 { content: [...], totalPages: x, ... } 或直接数组
      set({
        todos: Array.isArray(data) ? data : data.content || [],
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setIsFilter: (isFilter) => set({ isFilter }),

  handleToggleTodo: async (id) => {
    await get().updateTodo(id, {
      completed: !get().todos.find((todo) => todo.id === id).completed,
    });
  },

  handleAddTodo: async (title) => {
    if (!title?.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    await get().addTodo(newTodo.title);
  },

  clearCompleted: async () => {
    const completeTodoIds = get()
      .todos.filter((todo) => todo.completed)
      .map((todo) => todo.id);

    console.log("completeTodoIds:", completeTodoIds);

    await api.delete(`/todos`, { data: { ids: completeTodoIds } });
  },

  // GET
  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await api.get("/todos");
      set({ todos: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // POST
  addTodo: async (title) => {
    set({ loading: true, error: null });
    try {
      const data = await api.post("/todos", { title });
      set((state) => ({
        todos: [data, ...state.todos],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // PATCH
  updateTodo: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const data = await api.patch(`/todos/${id}`, updates);
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? data : todo)),
        loading: false,
      }));
      console.log("todo:", get().todos);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // DELETE
  deleteTodo: async (completedTodoIds) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/todos`, completedTodoIds);
      set((state) => ({
        todos: state.todos.filter(
          (todo) => !completedTodoIds.includes(todo.id)
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
