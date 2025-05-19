import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistance, isToday, isYesterday } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string relative to the current day
 * e.g. "Today, 2:30 PM", "Yesterday, 7:15 PM", "Jun 10, 10:45 AM"
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return `Today, ${format(date, "h:mm a")}`;
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, "h:mm a")}`;
  } else if (isWithinOneWeek(date)) {
    return formatDistance(date, new Date(), { addSuffix: true });
  } else {
    return format(date, "MMM d, h:mm a");
  }
}

/**
 * Check if date is within the last 7 days
 */
function isWithinOneWeek(date: Date): boolean {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return date >= oneWeekAgo;
}
