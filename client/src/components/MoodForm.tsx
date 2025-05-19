import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import MoodSelector from "./MoodSelector";
import { Loader2 } from "lucide-react";

interface MoodFormProps {
  onSubmit: (entry: { emoji: string; moodName: string; note?: string }) => void;
  isSubmitting?: boolean;
}

export default function MoodForm({ onSubmit, isSubmitting = false }: MoodFormProps) {
  const [selectedMood, setSelectedMood] = useState<{ emoji: string; name: string } | null>(null);
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      return; // Prevent submission without mood selection
    }

    onSubmit({
      emoji: selectedMood.emoji,
      moodName: selectedMood.name,
      note: note.trim() || undefined
    });

    // Reset form
    setSelectedMood(null);
    setNote("");
  };

  return (
    <Card className="bg-white rounded-xl shadow-md mb-8 animate-fade-in">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">How are you feeling today?</h2>
        
        <form onSubmit={handleSubmit}>
          <MoodSelector 
            selectedMood={selectedMood} 
            onSelectMood={setSelectedMood} 
          />
          
          <div className="mb-6">
            <Label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
              Add a note (optional)
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How was your day? What made you feel this way?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={!selectedMood || isSubmitting}
              className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Entry'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
