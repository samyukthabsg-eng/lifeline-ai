import { EmergencyAnalysisResult } from "@/types/emergency";
import { AlertCircle, CheckCircle2, Flame, Map, Phone, ShieldAlert, Stethoscope } from "lucide-react";

interface ResponsePanelProps {
  analysis: EmergencyAnalysisResult;
}

export default function ResponsePanel({ analysis }: ResponsePanelProps) {
  // Helper to determine colors based on urgency
  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-600 text-white animate-pulse border-red-800";
      case "High":
        return "bg-orange-500 text-white border-orange-700";
      case "Medium":
        return "bg-yellow-400 text-gray-900 border-yellow-600";
      case "Low":
        return "bg-green-500 text-white border-green-700";
      default:
        return "bg-gray-200 text-gray-800 border-gray-400";
    }
  };

  // Helper to get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Medical":
        return <Stethoscope className="h-6 w-6" />;
      case "Fire":
        return <Flame className="h-6 w-6 text-orange-500" />;
      case "Accident":
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      default:
        return <ShieldAlert className="h-6 w-6" />;
    }
  };

  const getResourceQuery = (category: string) => {
    switch (category) {
      case "Medical":
        return "nearest+hospital+emergency+room";
      case "Fire":
        return "nearest+fire+station";
      case "Accident":
        return "nearest+police+station";
      default:
        return "nearest+emergency+services";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-800 overflow-hidden transition-all">
      {/* Header with Urgency and Category */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          {getCategoryIcon(analysis.category)}
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {analysis.category} Emergency
          </h3>
        </div>
        <div
          className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-sm border-2 ${getUrgencyStyles(
            analysis.urgency
          )}`}
        >
          {analysis.urgency} URGENCY
        </div>
      </div>

      {/* Actionable Checklist */}
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Immediate Actions Required:
        </h4>
        <ul className="space-y-4">
          {analysis.checklist.map((step, index) => (
            <li key={index} className="flex gap-3 text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
              <span className="text-lg leading-snug">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 dark:bg-zinc-950/50 border-t border-gray-200 dark:border-zinc-800">
        <a 
          href={`https://www.google.com/maps/search/${getResourceQuery(analysis.category)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors shadow-sm hover:shadow group"
        >
          <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Map className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-semibold text-gray-800 dark:text-gray-200">Find Nearby Help</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 text-center">Opens Google Maps for nearest {analysis.category.toLowerCase()} resources</span>
        </a>

        <a 
          href="tel:911"
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-red-200 dark:border-red-900/50 hover:border-red-500 dark:hover:border-red-500 transition-colors shadow-sm hover:shadow group"
        >
          <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <span className="font-semibold text-gray-800 dark:text-gray-200">Emergency Services</span>
          <span className="text-xs text-red-500 dark:text-red-400 font-bold text-center">Tap to dial 911 immediately</span>
        </a>
      </div>

      {/* Standard Emergency Contacts Footer */}
      <div className="bg-gray-800 dark:bg-zinc-950 p-3 text-center">
        <p className="text-xs font-semibold text-gray-300 dark:text-gray-400">
          LifeLine AI Assistance Mode Active • Stay Calm
        </p>
      </div>
    </div>
  );
}
