import { MoodEntry as MoodEntryType } from "@shared/schema";
import { formatRelativeDate } from "@/lib/utils";
import { getMoodColor } from "@/lib/moodData";

interface MoodEntryProps {
  entry: MoodEntryType;
}

export default function MoodEntry({ entry }: MoodEntryProps) {
  const borderColor = getMoodColor(entry.moodName);
  
  // Format created_at timestamp to string for formatting
  const createdAtStr = typeof entry.createdAt === 'string' 
    ? entry.createdAt 
    : entry.createdAt.toISOString();
  
  return (
    <div className={`border-l-4 ${borderColor} pl-4 py-2 entry-appear`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-3">{entry.emoji}</span>
          <div>
            <div className="font-medium text-gray-900">{entry.moodName}</div>
            <div className="text-sm text-gray-500">
              {formatRelativeDate(createdAtStr)}
            </div>
          </div>
        </div>
      </div>
      
      {entry.note && (
        <div className="mt-2 text-gray-700">{entry.note}</div>
      )}
    </div>
  );
}
