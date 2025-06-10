# Altametrics Full Stack Project - Client

This is the frontend client for the Altametrics Full Stack Project, built with React, TypeScript, and Vite.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see Server README)

## Credentials

Email: john.doe@example.com
Password: password123

## Environment Setup

1. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start on `http://localhost:5173` by default.

## Features

- Modern UI with Tailwind CSS
- Dark/Light mode support
- Redux state management
- React Query for API data fetching
- Protected routes with JWT authentication
- Responsive design
- Real-time form validation

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── api/            # API service layer
├── components/     # Reusable components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── store/          # Redux store and slices
├── utils/          # Utility functions
└── types/          # TypeScript type definitions
```

## Default Login Credentials

```
Email: admin@example.com
Password: admin123
```

## State Management

- Redux is used for global state (auth, theme)
- React Query for server state
- Local state for component-specific data

## Styling

- Tailwind CSS for utility-first styling
- Custom color scheme and components
- Dark mode support
- Responsive design patterns

## Error Handling

If you encounter any errors:

1. Ensure the backend server is running
2. Check if the API URL in `.env` is correct
3. Verify your Node.js version
4. Clear browser cache and local storage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is MIT licensed.
