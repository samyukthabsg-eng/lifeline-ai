import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const logs = await prisma.emergencyLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50, // Display the 50 most recent logs
  });

  return (
    <div className="flex-grow flex flex-col p-4 md:p-8 bg-gray-50 dark:bg-zinc-950 min-h-screen">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <ShieldAlert className="h-8 w-8 text-red-600" />
              Emergency History Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              A log of all analyzed emergencies processed by LifeLine AI.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Responder
          </Link>
        </div>

        {logs.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">No emergencies logged yet.</h3>
            <p className="text-gray-500 dark:text-gray-400">When users report emergencies, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-2">
                      {formatDistanceToNow(log.createdAt, { addSuffix: true })}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-relaxed">
                      "{log.description}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-bold border border-gray-200 dark:border-zinc-700">
                      {log.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold border ${
                        log.urgency === "Critical"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : log.urgency === "High"
                          ? "bg-orange-100 text-orange-800 border-orange-200"
                          : log.urgency === "Medium"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      }`}
                    >
                      {log.urgency}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
