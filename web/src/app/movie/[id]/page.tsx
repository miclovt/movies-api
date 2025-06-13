"use client";
import { GetMovie, GetMovieAvgRate } from "@/api/movies.api";
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
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          {movie?.name}
        </h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Summary:</span> {movie?.summary}
        </p>
        <p className="text-gray-800 text-lg font-bold mb-6">
          Average Rating:
          <span className="text-blue-600">{avgRate?.average}</span> / 5
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

          {/* <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Add Your Rating
          </h3>
          <form onSubmit={handleRatingSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="score"
                className="block text-gray-700 font-semibold mb-2"
              >
                Score (1-5):
              </label>
              <input
                type="number"
                id="score"
                min="1"
                max="5"
                value={score}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setScore(e.target.value)
                }
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="review"
                className="block text-gray-700 font-semibold mb-2"
              >
                Review (Optional):
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setReview(e.target.value)
                }
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              ></textarea>
            </div>
            {submitError && (
              <p className="text-red-500 text-sm mt-2">{submitError}</p>
            )}
            {submitSuccess && (
              <p className="text-green-600 text-sm mt-2">
                Rating submitted successfully!
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Rating"}
            </button>
          </form> */}
        </section>
      </div>
    </>
  );
};

export default MoviePage;
