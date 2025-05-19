import Header from "@/components/Header";
import MoodForm from "@/components/MoodForm";
import MoodHistory from "@/components/MoodHistory";
import { useEffect, useState } from "react";
import { LocalMoodEntry } from "@shared/schema";
import { loadMoodEntries, saveMoodEntry } from "@/lib/moodData";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [moodEntries, setMoodEntries] = useState<LocalMoodEntry[]>([]);
  const { toast } = useToast();

  // Load saved mood entries from local storage
  useEffect(() => {
    const entries = loadMoodEntries();
    setMoodEntries(entries);
  }, []);

  // Handle new mood entry submission
  const handleSubmitEntry = (newEntry: Omit<LocalMoodEntry, "id" | "createdAt">) => {
    try {
      // Generate a unique ID and add timestamp
      const entry: LocalMoodEntry = {
        ...newEntry,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };

      // Save to local storage
      const updatedEntries = [entry, ...moodEntries];
      saveMoodEntry(entry);
      
      // Update state
      setMoodEntries(updatedEntries);
      
      // Show success message
      toast({
        title: "Entry saved",
        description: "Your mood entry has been saved successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error saving entry",
        description: "There was a problem saving your mood entry.",
        variant: "destructive",
      });
      console.error("Error saving mood entry:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <Header />
      <MoodForm onSubmit={handleSubmitEntry} />
      <MoodHistory entries={moodEntries} />
    </div>
  );
}
