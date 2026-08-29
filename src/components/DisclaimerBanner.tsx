import { AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-2 text-center text-sm font-semibold shadow-md flex items-center justify-center gap-2">
      <AlertTriangle className="h-5 w-5 shrink-0" />
      <span>
        <strong>DISCLAIMER:</strong> LifeLine AI is an experimental tool and NOT a replacement for professional emergency services. In a real emergency, call your local authorities (e.g., 911, 112) immediately.
      </span>
    </div>
  );
}
