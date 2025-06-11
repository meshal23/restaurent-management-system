/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useMovieStore from "../stores/useMovieStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const MoviesList = () => {
  const movies = useMovieStore((state: any) => state.movies);
  const addMovie = useMovieStore((state) => state.addMovie);
  const removeMovie = useMovieStore((state) => state.removeMovie);

  const [name, setName] = useState("");
  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center">
      <div className="flex flex-col">
        <div className="flex min-w-full gap-2">
          <div className="mb-6">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <Button
            onClick={() => {
              addMovie(name);
              setName("");
            }}
          >
            Add Movie
          </Button>
        </div>
        <br />
        <h1 className="text-4xl font-bold">Movies List</h1>
        <br />
        <ul className="flex flex-col gap-2">
          {movies.length === 0
            ? "List is empty"
            : movies?.map((movie: any) => {
                return (
                  <li
                    className="p-2 border border-black rounded flex justify-between"
                    key={movie.id}
                  >
                    <p>{movie.name}</p>
                    <div
                      onClick={() => removeMovie(movie.id)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="text-red-700" />
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

export default MoviesList;
