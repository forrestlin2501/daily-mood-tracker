# Daily Vibes - Mood Tracking App

![Daily Vibes Logo](./generated-icon.png)

Daily Vibes is a mood tracking application that helps you monitor your emotional well-being over time. The app allows you to record your mood using emojis, add optional notes, and visualize your mood patterns through interactive charts.

## Features

- **Emoji-Based Mood Selection**: Choose from 10 different mood emojis to quickly capture how you're feeling
- **Note Taking**: Add personal notes to provide context for each mood entry
- **Chronological History**: View your past mood entries in order with date and time formatting
- **Interactive Dashboard**: Analyze your mood patterns with visual charts and statistics
- **Database Storage**: Secure data persistence using PostgreSQL for reliable storage
- **Responsive Design**: Enjoy a seamless experience on desktop and mobile devices

## Technologies Used

- **Frontend**: React, TailwindCSS, shadcn/ui components
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Data Visualization**: Recharts for interactive graphs
- **State Management**: React Query for data fetching and state

## Setup Instructions

### Prerequisites

- Node.js (v20.x or higher)
- PostgreSQL database

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/daily-vibes.git
   cd daily-vibes
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   - Create a `.env` file in the root directory
   - Add your database connection string:
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/daily_vibes
     ```

4. Set up the database
   ```
   npm run db:push
   ```

5. Start the application
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
daily-vibes/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── pages/       # Application pages
├── server/              # Backend Express server
│   ├── db.ts            # Database connection
│   ├── routes.ts        # API routes
│   └── storage.ts       # Data access layer
├── shared/              # Shared code between frontend and backend
│   └── schema.ts        # Database schema and type definitions
└── README.md            # Project documentation
```

## API Endpoints

- `GET /api/mood-entries` - Retrieve all mood entries
- `GET /api/mood-entries/:id` - Retrieve a specific mood entry
- `POST /api/mood-entries` - Create a new mood entry

## Future Enhancements

- User authentication for multiple user support
- Mood entry editing and deletion
- Advanced filtering options by date range and mood type
- Custom mood creation
- Export capabilities (CSV, PDF)
- Reminder notifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Emoji icons provided by [Unicode Emoji](https://unicode.org/emoji/charts/full-emoji-list.html)
- Design inspiration from various mood tracking applications
- Built with React and Express.js frameworks