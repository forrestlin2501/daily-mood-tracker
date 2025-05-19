import { useState } from "react";
import Header from "@/components/Header";
import MoodForm from "@/components/MoodForm";
import MoodHistory from "@/components/MoodHistory";
import MoodInsights from "@/components/MoodInsights";
import { MoodEntry } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export default function Home() {
  const [showInsights, setShowInsights] = useState(false);
  const { toast } = useToast();

  // Fetch mood entries from the API
  const { 
    data: moodEntries = [], 
    isLoading,
    error 
  } = useQuery<MoodEntry[]>({
    queryKey: ['/api/mood-entries'],
  });

  // Create a mutation for adding new mood entries
  const createEntryMutation = useMutation({
    mutationFn: async (entry: { emoji: string; moodName: string; note?: string }) => {
      const res = await apiRequest('POST', '/api/mood-entries', entry);
      return res.json();
    },
    onSuccess: () => {
      // Invalidate the mood entries query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['/api/mood-entries'] });
      
      // Show success message
      toast({
        title: "Entry saved",
        description: "Your mood entry has been saved successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error saving entry",
        description: "There was a problem saving your mood entry.",
        variant: "destructive",
      });
      console.error("Error saving mood entry:", error);
    }
  });

  // Handle new mood entry submission
  const handleSubmitEntry = (newEntry: { emoji: string; moodName: string; note?: string }) => {
    createEntryMutation.mutate(newEntry);
  };

  // Show error message if data fetching fails
  if (error) {
    console.error("Error fetching mood entries:", error);
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <Header />
      
      <div className="flex justify-end mb-4">
        <Button 
          onClick={() => setShowInsights(true)}
          className="flex items-center gap-2"
          variant="outline"
        >
          <BarChart3 className="h-4 w-4" />
          View Insights
        </Button>
      </div>
      
      <MoodForm onSubmit={handleSubmitEntry} isSubmitting={createEntryMutation.isPending} />
      
      <MoodHistory 
        entries={moodEntries} 
        isLoading={isLoading} 
        error={error ? "Failed to load mood entries" : undefined} 
      />
      
      <MoodInsights 
        entries={moodEntries}
        isOpen={showInsights}
        onClose={() => setShowInsights(false)}
      />
    </div>
  );
}
