# 🏢 Agency & Contact Dashboard

A Next.js (App Router) dashboard application with Clerk authentication for managing agencies and contacts.

## Features

- **Clerk Authentication**: Users must sign in to access the dashboard
- **Agencies Page**: View and browse partner agency information
- **Contacts Page**: Browse contact directory with a daily view limit
- **Rate Limiting**: Server-side check limits authenticated users to 50 contact views per day
- **Upgrade Prompt**: When the limit is exceeded, users see an "Upgrade to view more" prompt
- **Tailwind CSS**: Modern, responsive styling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A [Clerk](https://clerk.com) account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ybahij/dashboard-internship-assignment.git
   cd dashboard-internship-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Add your Clerk keys to `.env.local`:
   - Get your keys from [Clerk Dashboard](https://dashboard.clerk.com)
   - Update `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── contacts/
│   │       └── route.ts      # Contacts API with rate limiting
│   ├── dashboard/
│   │   ├── agencies/
│   │   │   └── page.tsx      # Agencies page
│   │   ├── contacts/
│   │   │   └── page.tsx      # Contacts page with limit UI
│   │   ├── layout.tsx        # Dashboard layout with navigation
│   │   └── page.tsx          # Dashboard home
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx      # Clerk sign-in page
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx      # Clerk sign-up page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with ClerkProvider
│   └── page.tsx              # Landing page
└── middleware.ts             # Clerk authentication middleware
```

## Rate Limiting Implementation

The contacts API (`/api/contacts`) implements a server-side rate limit:

- Each authenticated user is limited to **50 contact views per day**
- View count resets at midnight UTC
- When the limit is exceeded, the API returns a 429 status with `limitExceeded: true`
- The frontend displays an "Upgrade to view more" prompt

> **Note**: The current implementation uses in-memory storage for view counts. In production, use a persistent store like Redis or a database.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Clerk](https://clerk.com/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
