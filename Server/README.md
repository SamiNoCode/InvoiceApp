# Altametrics Full Stack Project - Server

This is the backend server for the Altametrics Full Stack Project, built with NestJS and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Environment Setup

## COMANDS

cd Server

# Set up .env file

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/invoice_db"
JWT_SECRET=your_jwt_secret_key

npm install

# Create PostgreSQL database

Download Doker app
Then Run this:
docker-compose up -d

# Generate and apply Prisma schema

npx prisma generate
npx prisma migrate dev

# Seed the database

npm run prisma:seed

# Start the development server

npm run start:dev

## Available Scripts

```bash
# Development
npm run start:dev     # Start in development mode
npm run start:debug   # Start in debug mode

# Database
npx prisma generate        # Generate Prisma client
npx prisma migrate dev     # Run migrations in development
npx prisma migrate deploy  # Run migrations in production
npm run prisma:seed       # Run database seeds

# Testing
npm run test          # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:cov     # Generate test coverage report

# Build
npm run build        # Build the application
npm run format       # Format code with Prettier
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── auth/           # Authentication module
├── user/           # User module
├── invoice/        # Invoice module
├── expense/        # Expense module
├── vendor/         # Vendor module
├── prisma/         # Prisma schema and migrations
├── config/         # Configuration files
└── common/         # Shared utilities and interfaces
```
