# Backend Authentication App

## Setup

1. Clone the repo
   git clone https://github.com/utsanakorn/-backend_authentication-.git
   cd -backend_authentication-

2. Install dependencies
   npm install --legacy-peer-deps

3. Create environment variables
   Create a .env file in the root directory and add:

   EXPO_PUBLIC_SUPABASE_URL=your_project_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

4. Run the app
   npx expo start

## Supabase Setup Notes

- Authentication: Email/Password enabled (default)
- Credentials stored in .env (not committed to GitHub)
- Sessions are persisted using Asyncstorage

## Testing:

1. Create an account (Sign-Up)
2. Sign in with valid credentials
3. Verify redirect to Home Screen
4. Close and reopen the app and session should still persist
5. Sign out returns you to the Sign-in page
6. Trying to access protected routes while logged out should redirect you to sign-in page.

## Team

- Person 1 (Kate): Sign-In, Sign-Up screens, Supabase client
- Person 2: Protected navigation, Session handling, Sign-Out
- Person 3: Supabase setup, README, repo management
