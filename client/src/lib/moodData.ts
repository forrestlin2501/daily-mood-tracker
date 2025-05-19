import { LocalMoodEntry, moodEntrySchema } from "@shared/schema";
import { z } from "zod";

// Available moods with emojis and names
export const moods = [
  { emoji: "😊", name: "Happy" },
  { emoji: "😃", name: "Excited" },
  { emoji: "😌", name: "Relaxed" },
  { emoji: "🙂", name: "Content" },
  { emoji: "😐", name: "Neutral" },
  { emoji: "😕", name: "Confused" },
  { emoji: "😢", name: "Sad" },
  { emoji: "😠", name: "Angry" },
  { emoji: "😴", name: "Tired" },
  { emoji: "🤔", name: "Thoughtful" }
];

// Local storage key
const STORAGE_KEY = "daily-vibes-mood-entries";

// Load mood entries from local storage
export function loadMoodEntries(): LocalMoodEntry[] {
  try {
    const storedEntries = localStorage.getItem(STORAGE_KEY);
    if (!storedEntries) return [];
    
    const parsedEntries = JSON.parse(storedEntries);
    return z.array(moodEntrySchema).parse(parsedEntries);
  } catch (error) {
    console.error("Error loading mood entries:", error);
    return [];
  }
}

// Save a new mood entry to local storage
export function saveMoodEntry(entry: LocalMoodEntry): void {
  try {
    const currentEntries = loadMoodEntries();
    const updatedEntries = [entry, ...currentEntries];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error("Error saving mood entry:", error);
    throw error;
  }
}

// Get color based on mood name for styling
export function getMoodColor(moodName: string): string {
  const colors = {
    "Happy": "border-green-500",
    "Excited": "border-primary",
    "Relaxed": "border-blue-500",
    "Content": "border-teal-500",
    "Neutral": "border-gray-500",
    "Confused": "border-yellow-500",
    "Sad": "border-indigo-500",
    "Angry": "border-red-500",
    "Tired": "border-purple-500",
    "Thoughtful": "border-amber-500"
  };
  
  return colors[moodName as keyof typeof colors] || "border-gray-500";
}
