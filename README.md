# Backend Authentication App

## Setup

1. Clone the repo
git clone https://github.com/utsanakorn/-backend\_authentication-.git
cd -backend\_authentication-
2. Install dependencies
npm install --legacy-peer-deps
3. Create environment variables
Create a .env file in the root directory and add:

   EXPO\_PUBLIC\_SUPABASE\_URL=your\_project\_url
EXPO\_PUBLIC\_SUPABASE\_ANON\_KEY=your\_anon\_key

4. Run the app
npx expo start

   ## Supabase Setup Notes

* Authentication: Email/Password enabled (default)
* Credentials stored in .env (not committed to GitHub)
* Sessions are persisted using Asyncstorage

  ## Testing:

1. Create an account (Sign-Up)
2. Sign in with valid credentials
3. Verify redirect to Home Screen
4. Close and reopen the app and session should still persist
5. Sign out returns you to the Sign-in page
6. Trying to access protected routes while logged out should redirect you to sign-in page.

