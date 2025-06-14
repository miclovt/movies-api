"use client";
import { GetMovie, GetMovieAvgRate } from "@/api/movies.api";
import AddActorsDialog from "@/components/AddActorsDialog";
import { Link } from "@/components/link";
import { Movie, Rate, RateAverage } from "@/types/movies";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MoviePage = () => {
  const params = useParams();
  const id = params.id as string;
  const [movie, setMovie] = useState<Movie>();
  const [avgRate, setAvgRate] = useState<RateAverage>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [showAddActorsDialog, setShowAddActorsDialog] =
    useState<boolean>(false);

  useEffect(() => {
    const LoadMovie = async (id: string) => {
      try {
        setLoading(true);
        const movie = await GetMovie(id);
        const rate = await GetMovieAvgRate(id);
        setMovie(movie);
        setAvgRate(rate);
        setError(undefined);
      } catch (error) {
        setError("Failed to Load Movie");
      } finally {
        setLoading(false);
      }
    };

    LoadMovie(id);
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
    <>
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Movies
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
            {movie?.name}
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setShowAddActorsDialog(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-lg flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Actor(s)
            </button>
          </div>
        </div>
        {showAddActorsDialog && (
          <AddActorsDialog
            movieId={id}
            currentActorsIdsInMovie={
              movie?.actors?.map((x) => x.id) as string[]
            }
            onClose={() => setShowAddActorsDialog(false)}
            onUpdate={() => window.location.reload()}
          />
        )}
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Summary:</span> {movie?.summary}
        </p>
        <p className="text-gray-800 text-lg font-bold mb-6">
          Average Rating:
          <span className="text-blue-600">{avgRate?.average}</span> / 5
        </p>
        <p className="text-gray-800 text-lg font-bold mb-6">
          Actors:
          <span className="text-gray-600">
            {movie?.actors?.map((x) => x.name).join(",")}
          </span>
        </p>

        <section className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Ratings & Reviews
          </h2>
          {movie?.rates && movie.rates.length === 0 ? (
            <p className="text-gray-600 mb-4">No ratings yet</p>
          ) : (
            <div className="space-y-4 mb-8">
              {movie?.rates &&
                movie.rates.map((rate: Rate) => (
                  <div
                    key={rate.id}
                    className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200"
                  >
                    <p className="text-xl font-extrabold mb-4 text-gray-900">
                      {rate.userName}
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      Score: {rate.value} / 5
                    </p>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default MoviePage;
