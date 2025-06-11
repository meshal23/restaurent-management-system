/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";

const movieStore = (set: any, get: any) => ({
  movies: [
    {
      id: Math.floor(Math.random() * 100),
      name: "Pirates Of The Caribbean",
    },

    {
      id: Math.floor(Math.random() * 100),
      name: "Harry Potter",
    },
  ],
  addMovie: (payload: any) =>
    set(
      produce<{ movies: { id: number; name: string }[] }>((draft) => {
        draft?.movies?.push({
          id: Math.floor(Math.random() * 100),
          name: payload,
        });
      })
    ),

  removeMovie: (payload: number) =>
    set(
      produce<{ movies: { id: number; name: string }[] }>((draft) => {
        draft.movies = draft?.movies?.filter((movie) => movie.id != payload);
      })
    ),
});

const useMovieStore = create(
  persist(movieStore, {
    name: "movies",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default useMovieStore;
