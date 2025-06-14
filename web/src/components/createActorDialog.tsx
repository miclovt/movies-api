import { CreateActor } from "@/api/actors.api";
import { DialogProps } from "@/types/props";
import { redirect } from "next/navigation";
import { useState } from "react";

const CreateActorDialog = ({ onClose }: DialogProps) => {
  const [name, setName] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const id = await CreateActor({ name: name }, apiKey);
      setName("");
      setApiKey("");
      redirect(`/Actor/${id}`);
    } catch (err) {
      setSubmitError("Failed to create Actor.");
    } finally {
      setSubmitting(false);
    }
  };

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
          Create New Actor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <p className="text-red-500 text-sm mt-2 text-center">
              {submitError}
            </p>
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
              disabled={submitting}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300 ease-in-out shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActorDialog;
