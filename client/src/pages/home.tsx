import Header from "@/components/Header";
import MoodForm from "@/components/MoodForm";
import MoodHistory from "@/components/MoodHistory";
import { MoodEntry } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Home() {
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
        variant: "success",
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
      <MoodForm onSubmit={handleSubmitEntry} isSubmitting={createEntryMutation.isPending} />
      <MoodHistory 
        entries={moodEntries} 
        isLoading={isLoading} 
        error={error ? "Failed to load mood entries" : undefined} 
      />
    </div>
  );
}
