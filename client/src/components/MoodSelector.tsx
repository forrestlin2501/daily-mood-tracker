import { Label } from "@/components/ui/label";
import { moods } from "@/lib/moodData";

interface MoodSelectorProps {
  selectedMood: { emoji: string; name: string } | null;
  onSelectMood: (mood: { emoji: string; name: string } | null) => void;
}

export default function MoodSelector({ selectedMood, onSelectMood }: MoodSelectorProps) {
  return (
    <div className="mb-6">
      <Label className="block text-sm font-medium text-gray-700 mb-2">
        Select your mood
      </Label>
      
      <div className="emoji-grid">
        {moods.map((mood) => (
          <button
            key={mood.emoji}
            type="button"
            className={`emoji-btn ${selectedMood?.emoji === mood.emoji ? 'selected' : ''}`}
            onClick={() => onSelectMood(mood)}
            aria-label={`Select mood: ${mood.name}`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      
      <div className="text-sm text-primary-600 font-medium mt-2">
        {selectedMood 
          ? `Selected: ${selectedMood.emoji} (${selectedMood.name})` 
          : 'Please select a mood'}
      </div>
    </div>
  );
}
