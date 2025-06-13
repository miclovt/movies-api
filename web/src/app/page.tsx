"use client";
import { GetMovies } from "@/api/movies.api";
import { Link } from "@/components/link";
import { Movie } from "@/types/movies";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const LoadMovies = async () => {
      try {
        setLoading(true);
        const movies = await GetMovies();
        setMovies(movies);
        setError(undefined);
      } catch (error) {
        console.log(error);
        setError("Failed to Load Movies Information");
      } finally {
        setLoading(false);
      }
    };

    LoadMovies();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Loading movies...</p>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center text-lg">Error: {error}</div>
    );

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        All Movies
      </h1>
      {movies && movies.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No movies found. Why not add one?
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies &&
            movies.map((movie: Movie) => (
              <div
                key={movie.id}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-blue-700 mb-2 truncate">
                  {movie.name}
                </h2>
                <p className="text-gray-700 mb-1">{movie.summary}</p>
                <Link
                  href={`/movie/${movie.id}`}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow"
                >
                  View Details
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
