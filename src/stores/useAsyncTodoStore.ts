/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { create } from "zustand";

const useAsyncTodoStore = create((set) => ({
  todos: [],
  loading: false,
  fetchTodos: async () => {
    set({ loading: true });
    const response = await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .catch((err) => {
        const error = err instanceof Error ? err.message : String(err);
        console.log(error);
      });
    set({ todos: response?.data, loading: false });
  },
  addTodo: (todo: any) =>
    set((state: any) => ({ todos: [...state.todos, todo] })),
}));

export default useAsyncTodoStore;
