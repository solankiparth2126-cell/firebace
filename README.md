# MoneyFlow Pro

A modern, AI-powered personal finance management application built with Next.js, Genkit, and Firebase.

## Features

- **Financial Overview**: Real-time dashboard tracked in Indian Rupees (₹).
- **Ledger Management**: Full control over 4 bank accounts and 3 credit cards (Add, Rename, Remove).
- **AI Statement Import**: Automatically parse and categorize bank statement text using Google Gemini.
- **Transaction Tracking**: Detailed history with smart categories like Food, Rent, and Investments.
- **Secure Authentication**: Professional login flow with simulated 2-step verification.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [Genkit](https://firebase.google.com/docs/genkit) with Gemini 2.5 Flash
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore & Auth)

## GitHub Deployment Instructions

To upload this project to your own GitHub account:

1. **Initialize Git**:
   ```bash
   git init
   ```

2. **Stage your changes**:
   ```bash
   git add .
   ```

3. **Create your first commit**:
   ```bash
   git commit -m "Initial commit: MoneyFlow Pro with AI Statement Import"
   ```

4. **Connect to GitHub**:
   - Create a new repository on [GitHub](https://github.com/new).
   - Copy the repository URL.
   - Run:
     ```bash
     git remote add origin <PASTE_YOUR_REPO_URL_HERE>
     git branch -M main
     git push -u origin main
     ```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:9002](http://localhost:9002) in your browser.