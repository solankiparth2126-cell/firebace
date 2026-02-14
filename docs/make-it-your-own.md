# 🚀 How to Make MoneyFlow Pro Your Own

Follow these steps to customize, secure, and deploy your personal version of this AI-powered finance suite.

## 1. Custom Branding
Personalize the app by changing the name and identity.
- **App Name**: Open `src/app/layout.tsx` and update the `<title>` in the metadata.
- **Sidebar & Header**: Open `src/components/layout/app-sidebar.tsx` and change the "MoneyFlow" text to your desired brand name.
- **Login Screen**: Update the title in `src/app/login/page.tsx` to reflect your new name.

## 2. Set Up Your Firebase Backend
To store real data instead of mock data, you'll need your own Firebase project.
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. **Enable Authentication**: Go to "Build" -> "Authentication" and enable the **Email/Password** provider.
4. **Enable Firestore**: Go to "Build" -> "Cloud Firestore" and create a database in **Test Mode** (you will apply our custom rules later).
5. **Get Config**: Click the gear icon (Project Settings), add a "Web App", and copy the `firebaseConfig` object.
6. **Update Code**: Paste your config into `src/firebase/config.ts`.

## 3. Apply Security Rules
Protect your data by using the rules we've already written.
1. Copy the contents of `firestore.rules` from this project.
2. In the Firebase Console, go to **Firestore** -> **Rules** tab.
3. Paste the rules there and click **Publish**.

## 4. AI Features (Google Gemini)
The AI parsing and reports require an API key.
1. Get an API key from [Google AI Studio](https://aistudio.google.com/).
2. Add it to your `.env` file (locally) or your deployment environment variables:
   ```env
   GEMINI_API_KEY=your_key_here
   ```

## 5. Deploy to GitHub
Share your project and host it for free.
1. Create a new repository on [GitHub](https://github.com/new).
2. Open your terminal in this project and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: My Custom Finance App"
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git branch -M main
   git push -u origin main
   ```

## 6. Hosting
For the best experience, we recommend **Firebase App Hosting** or **Vercel**. Since this is a Next.js 15 app, both will work seamlessly.

---
**Need help?** Just ask me to explain any specific part of the code!