# Daily Serenity 🌸

Your all-in-one companion for mindfulness, healthy nutrition, and breathing exercises. Start each day with intention and end it with gratitude.

## Features

- **🧘 Guided Meditations** - Daily meditation sessions tailored to your mood and schedule
- **🌬️ Breathing Exercises** - Science-backed breathing techniques to calm or energize
- **✨ Daily Affirmations** - Inspiring affirmations across 5 categories to boost your mindset
- **🥗 Meal Suggestions** - Mood-boosting meal ideas for breakfast, lunch, dinner, and snacks
- **💜 Mood Tracking** - Daily check-ins to monitor your emotional well-being
- **📝 Journaling** - Space for daily reflection, gratitude, and intention setting
- **📈 Progress Tracking** - Build streaks and track your wellness journey

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Sivlejs/Daily-serenity.git
cd Daily-serenity

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run lint` - Lint the codebase

## Deployment to Render

This project is configured for easy deployment to [Render](https://render.com) as a static site.

### Option 1: Deploy via Render Dashboard

1. Create a new **Static Site** on Render
2. Connect your GitHub repository
3. Render will auto-detect the `render.yaml` configuration
4. The site will be built and deployed automatically

### Option 2: Deploy via render.yaml (Blueprint)

The repository includes a `render.yaml` file that configures:
- Build command: `npm install && npm run build`
- Publish directory: `./dist`
- SPA routing support (all routes redirect to `index.html`)
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)

Simply connect your repo to Render and it will use the blueprint configuration.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Vitest** - Testing framework

## Project Structure

```
src/
├── components/
│   ├── features/     # Feature components (MeditationCard, MoodTracker, etc.)
│   ├── layout/       # Layout components (Navbar, Footer)
│   └── ui/           # Reusable UI components (Button, Card, ProgressBar)
├── contexts/         # React contexts (Auth, App state)
├── data/             # Static data (meditations, meals, affirmations, etc.)
├── pages/            # Page components
├── utils/            # Utility functions
└── __tests__/        # Test files
```

## License

MIT
