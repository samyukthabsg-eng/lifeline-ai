import EmergencyForm from "@/components/EmergencyForm";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50 dark:bg-zinc-950">
      <div className="text-center mb-8 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-red-600 mb-4">
          LifeLine AI
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
          Intelligent emergency response guidance when every second counts.
        </p>
        <Link
          href="/history"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-semibold transition-colors"
        >
          <Activity className="h-4 w-4 text-red-500" />
          View Emergency History Dashboard
        </Link>
      </div>
      
      <EmergencyForm />
      
      <div className="mt-12 text-sm text-gray-500 max-w-md text-center">
        <p>This is a hackathon project for BuildSprint 2026.</p>
      </div>
    </div>
  );
}
