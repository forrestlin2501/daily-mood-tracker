import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { BarChart3, XCircle } from "lucide-react";
import { MoodEntry } from "@shared/schema";
import { getMoodColor } from "@/lib/moodData";

interface MoodInsightsProps {
  entries: MoodEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MoodInsights({ entries, isOpen, onClose }: MoodInsightsProps) {
  const [moodCounts, setMoodCounts] = useState<any[]>([]);
  
  useEffect(() => {
    if (!entries || entries.length === 0) return;
    
    // Group entries by mood name
    const counts: Record<string, number> = {};
    entries.forEach(entry => {
      if (counts[entry.moodName]) {
        counts[entry.moodName]++;
      } else {
        counts[entry.moodName] = 1;
      }
    });
    
    // Convert to array for the chart
    const countsArray = Object.keys(counts).map(moodName => ({
      name: moodName,
      count: counts[moodName],
      color: getMoodColor(moodName).replace('border-', 'bg-')
    }));
    
    // Sort by count
    countsArray.sort((a, b) => b.count - a.count);
    
    setMoodCounts(countsArray);
  }, [entries]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-lg animate-in fade-in zoom-in duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary flex items-center">
              <BarChart3 className="mr-2 h-6 w-6" />
              Mood Insights Dashboard
            </h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8 rounded-full"
            >
              <XCircle className="h-6 w-6" />
            </Button>
          </div>
          
          {entries.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg">No mood data to display yet</p>
              <p>Start tracking your moods to see insights</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Mood Distribution</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={moodCounts} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={80} 
                        tick={{ fontSize: 12 }} 
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" name="Count">
                        {moodCounts.map((entry, index) => (
                          <Cell key={`cell-${index}`} className={entry.color.replace('bg-', '')} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Mood Breakdown</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={moodCounts}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {moodCounts.map((entry, index) => (
                          <Cell key={`cell-${index}`} className={entry.color.replace('bg-', '')} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Insights Summary</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>You've tracked {entries.length} mood entries in total</li>
                  {moodCounts.length > 0 && (
                    <li>Your most common mood is <strong>{moodCounts[0]?.name}</strong> ({moodCounts[0]?.count} times)</li>
                  )}
                  {entries.length > 0 && (
                    <li>Your most recent mood was <strong>{entries[0]?.moodName}</strong></li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}