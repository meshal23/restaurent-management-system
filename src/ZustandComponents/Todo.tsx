/* eslint-disable @typescript-eslint/no-explicit-any */
import useAsyncTodoStore from "@/stores/useAsyncTodoStore";
// import { shallow } from "zustand/shallow";
import React, { useEffect } from "react";

const Todo = () => {
  //   const { todos, loading, fetchTodos } = useAsyncTodoStore((state: any) => ({
  //     todos: state.todos,
  //     loading: state.loading,
  //     fetchTodos: state.fetchTodos,
  //   }));
  const todos = useAsyncTodoStore((state: any) => state.todos);
  const loading = useAsyncTodoStore((state: any) => state.loading);
  const fetchTodos = useAsyncTodoStore((state: any) => state.fetchTodos);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return (
    <div className="">
      {loading ? (
        <p>Loading todos ....</p>
      ) : (
        <ul>
          {todos?.map((todo: any) => {
            return <li key={todo.id}>{todo.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default Todo;
