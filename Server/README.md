# Altametrics Full Stack Project - Server

This is the backend server for the Altametrics Full Stack Project, built with NestJS and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Environment Setup

## COMANDS

cd Server
npm install

# Set up .env file

# Create PostgreSQL database

npm run migration:generate
npm run migration:run
npm run seed
npm run start:dev

1. Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/invoice_db"


# JWT Configuration
JWT_SECRET=your_jwt_secret_key
```

## Database Setup

You can either use Docker or a local PostgreSQL installation:

### Using Docker (Recommended)

```bash
# Start the PostgreSQL container
docker-compose up -d
```

### Using Local PostgreSQL

```bash
psql -U postgres
CREATE DATABASE invoice_db;
```

## Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate
```

## Seeding the Database

To populate the database with initial data:

```bash
# Run database migrations
npx prisma migrate dev

# Run database seeds
npm run prisma:seed
```

This will create:

- A default admin user (email: admin@example.com, password: admin123)
- Sample invoices
- Sample vendors
- Sample expenses

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Watch mode
npm run start
```

The server will start on `http://localhost:3000` by default.

## API Documentation

Once the server is running, you can access the API documentation at:
`http://localhost:3000/api-docs`

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
