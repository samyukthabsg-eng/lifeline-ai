export type EmergencyCategory = "Medical" | "Accident" | "Fire" | "Other";
export type UrgencyLevel = "Low" | "Medium" | "High" | "Critical";

export interface EmergencyAnalysisResult {
  category: EmergencyCategory;
  urgency: UrgencyLevel;
  checklist: string[];
}
