import { create } from "zustand";
import api from "../services/api";

export const useTodoStore = create((set, get) => ({
  todos: [],
  isFilter: false,
  loading: false,
  error: null,

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
  deleteTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/todos/${id}`);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
