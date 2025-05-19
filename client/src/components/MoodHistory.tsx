import { Card, CardContent } from "@/components/ui/card";
import MoodEntry from "./MoodEntry";
import { LocalMoodEntry } from "@shared/schema";

interface MoodHistoryProps {
  entries: LocalMoodEntry[];
}

export default function MoodHistory({ entries }: MoodHistoryProps) {
  return (
    <Card className="bg-white rounded-xl shadow-md animate-fade-in">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <span>Your Mood History</span>
          <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </span>
        </h2>

        {entries.length === 0 ? (
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
