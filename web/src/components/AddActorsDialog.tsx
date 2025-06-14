"use client";
import { GetActors } from "@/api/actors.api";
import { AddMovieActor, RemoveMovieActor } from "@/api/movies.api";
import { Actor } from "@/types/movies";
import { AddActorsDialogProps } from "@/types/props";
import { useEffect, useState } from "react";

const AddActorsDialog = ({
  movieId,
  currentActorsIdsInMovie,
  onClose,
  onUpdate,
}: AddActorsDialogProps) => {
  const [allActors, setAllActors] = useState<Actor[]>([]);
  const [selectdActorIds, setSelectedActorIds] = useState<string[]>(
    currentActorsIdsInMovie
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>();
  const [apiKey, setApiKey] = useState<string>();

  useEffect(() => {
    const LoadAllActors = async () => {
      try {
        setLoading(true);
        const actors = await GetActors();
        console.log(actors);
        setAllActors(actors);
        setLoadError(undefined);
      } catch (error) {
        setLoadError("Failed to Load Actors");
      } finally {
        setLoading(false);
      }
    };

    LoadAllActors();
  }, []);

  const handleCheckboxChange = (actorId: string) => {
    setSelectedActorIds((prev) =>
      prev.includes(actorId)
        ? prev.filter((id) => id !== actorId)
        : [...prev, actorId]
    );
  };

  const handleSave = async () => {
    setSubmitting(true);
    setSubmitError(undefined);
    try {
      const addedActors = selectdActorIds.filter(
        (x) => !currentActorsIdsInMovie.includes(x)
      );
      const removedActors = currentActorsIdsInMovie.filter(
        (x) => !selectdActorIds.includes(x)
      );

      const updateRequests = [];
      for (const addedActor of addedActors) {
        updateRequests.push(AddMovieActor(movieId, addedActor, ""));
      }

      for (const removedActor of removedActors) {
        updateRequests.push(RemoveMovieActor(movieId, removedActor, ""));
      }

      await Promise.all(updateRequests);
      onUpdate();
      onClose();
    } catch (err) {
      setSubmitError("Failed to update actors. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-lg text-gray-700">Loading ...</p>
        </div>
      </div>
    );

  if (loadError)
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative">
          <p className="text-red-500 text-center text-lg">
            Error on load: {loadError}
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200 shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Add Actors to Movie
        </h2>

        {allActors && allActors.length === 0 ? (
          <p className="text-center text-gray-600">
            No actors available to select.
          </p>
        ) : (
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-4 space-y-2">
            {allActors && allActors.length > 0 ? (
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-4 space-y-2">
                {allActors?.map((actor) => {
                  return (
                    <div key={actor.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`actor-${actor.id}`}
                        checked={selectdActorIds.includes(actor.id as string)}
                        onChange={() =>
                          handleCheckboxChange(actor.id as string)
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`actor-${actor.id}`}
                        className="ml-3 text-lg text-gray-800 cursor-pointer"
                      >
                        {actor.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No actors available to select.
              </p>
            )}
          </div>
        )}
        <div>
          <label
            htmlFor="modal-apiKey"
            className="block text-gray-700 font-semibold mb-2"
          >
            Insert Secret Key:
          </label>
          <input
            type="text"
            id="modal-apiKey"
            value={apiKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setApiKey(e.target.value)
            }
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-900"
          />
        </div>
        {submitError && (
          <p className="text-red-500 text-sm mt-4 text-center">{submitError}</p>
        )}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200 shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSave}
            disabled={submitting}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300 ease-in-out shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Save Actors"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddActorsDialog;
