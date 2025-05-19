import { format } from "date-fns";

export default function Header() {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Daily Vibes</h1>
      <p className="text-gray-600 mb-2">Track your mood, one day at a time</p>
      <p className="text-sm bg-primary/10 text-primary inline-block px-3 py-1 rounded-full font-medium">
        Today is {today}
      </p>
    </header>
  );
}
