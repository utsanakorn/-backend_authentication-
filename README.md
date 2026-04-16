# Backend Authentication App

## Setup

1. Clone the repo
   git clone https://github.com/utsanakorn/-backend_authentication-.git
   cd -backend_authentication-

2. Install dependencies
   npm install --legacy-peer-deps

3. Create .env file
   Copy .env.example to .env and fill in your Supabase credentials:
   EXPO_PUBLIC_SUPABASE_URL=https://wfautokhjlaziduntlbo.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmYXV0b2toamxhemlkdW50bGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyOTkwMTksImV4cCI6MjA5MTg3NTAxOX0.dfKvAwmmSRKq0kV9efwz_LHze88VveAuxnN4JNWxB1Y

4. Run the app
   npx expo start

## Supabase Setup

- Project URL: https://wfautokhjlaziduntlbo.supabase.co
- Authentication: Email/Password enabled (default)
- Credentials stored in .env (not committed to GitHub)

## Test Account

- Email:
- Password:

## Team

- Person 1 (Kate): Sign-In, Sign-Up screens, Supabase client
- Person 2: Protected navigation, Session handling, Sign-Out
- Person 3: Supabase setup, README, repo management
