import { create } from "zustand";
import todoItems from "../todoItems.json";

export const useRegisterStore = create((set, get) => ({
    todos: todoItems
}))
