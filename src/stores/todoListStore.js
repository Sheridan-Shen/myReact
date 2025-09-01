import { create } from "zustand";
import todoItems from "./todoItems.json";

export const useTodoListStore = create((set, get) => ({
  todos: todoItems,
  isFilter: false,

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  setIsFilter: (isFilter) => set({ isFilter }),

  addTodo: (title) => {
    if (!title?.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    set((state) => ({
      todos: [newTodo, ...state.todos],
    }));
  },
}));
