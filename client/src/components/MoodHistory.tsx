import { Card, CardContent } from "@/components/ui/card";
import MoodEntry from "./MoodEntry";
import { MoodEntry as MoodEntryType } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface MoodHistoryProps {
  entries: MoodEntryType[];
  isLoading?: boolean;
  error?: string;
}

export default function MoodHistory({ entries, isLoading = false, error }: MoodHistoryProps) {
  return (
    <Card className="bg-white rounded-xl shadow-md animate-fade-in">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <span>Your Mood History</span>
          {!isLoading && (
            <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </span>
          )}
        </h2>

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading your mood entries...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p className="text-lg mb-2">Something went wrong</p>
            <p>{error}</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg mb-2">No mood entries yet</p>
            <p>Your mood history will appear here once you start tracking</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <MoodEntry key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
