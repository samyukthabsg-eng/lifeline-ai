"use client";

import { useState } from "react";
import { Send, Mic, Loader2, MapPin } from "lucide-react";
import { EmergencyAnalysisResult } from "@/types/emergency";
import ResponsePanel from "./ResponsePanel";

export default function EmergencyForm() {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<EmergencyAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    setIsLocating(true);
    // Simulate GPS fetch delay
    setTimeout(() => {
      const mockLocation = " [Current Location: 40.7128° N, 74.0060° W - Downtown Area]";
      setDescription((prev) => prev + (prev.endsWith(" ") ? "" : " ") + mockLocation);
      setIsLocating(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze emergency.");
      }

      setAnalysisResult(data as EmergencyAnalysisResult);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
          Describe Your Emergency
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center text-sm">
          Please provide as much detail as possible about the situation, location, and people involved.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., There has been a car accident at the intersection of Main and 5th. One person is unconscious."
              className="w-full min-h-[160px] p-4 pb-14 text-lg border-2 border-gray-300 dark:border-zinc-700 rounded-lg focus:border-red-500 focus:ring-red-500 dark:focus:border-red-500 dark:bg-zinc-800 resize-none outline-none transition-colors disabled:opacity-50"
              required
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                type="button"
                className={`p-2 rounded-md flex items-center gap-1 text-sm font-medium transition-colors ${
                  isLocating ? "text-blue-500" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-700"
                }`}
                onClick={handleGetLocation}
                disabled={isLoading || isLocating}
                title="Attach current location"
              >
                {isLocating ? <Loader2 className="h-5 w-5 animate-spin" /> : <MapPin className="h-5 w-5" />}
                <span className="hidden sm:inline">{isLocating ? "Locating..." : "Share Location"}</span>
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-zinc-700 rounded-md transition-colors disabled:opacity-50"
                title="Use microphone (coming soon)"
                onClick={() => alert("Microphone input will be added later.")}
                disabled={isLoading}
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm font-semibold border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!description.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Analyze Emergency
              </>
            )}
          </button>
        </form>
      </div>

      {/* Conditionally render the response panel below the form */}
      {analysisResult && <ResponsePanel analysis={analysisResult} />}
    </div>
  );
}
