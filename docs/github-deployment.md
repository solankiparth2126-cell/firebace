# GitHub Deployment Guide

Follow these steps to upload your MoneyFlow Pro project to GitHub:

1. **Create a Repository**: Go to [GitHub](https://github.com/new) and create a new repository. Do not initialize it with a README, license, or .gitignore (as these are already present in your project).
2. **Open Terminal**: Open the terminal in your development environment.
3. **Initialize Git**:
   ```bash
   git init
   ```
4. **Stage Files**:
   ```bash
   git add .
   ```
5. **Commit Changes**:
   ```bash
   git commit -m "Initial commit: MoneyFlow Pro with AI features and Ledger Management"
   ```
6. **Set Remote**: Replace `<YOUR_REPO_URL>` with the URL of the repository you just created.
   ```bash
   git remote add origin <YOUR_REPO_URL>
   ```
7. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

**Security Tip**: Never share your `.env` file or API keys. The `.gitignore` file I added will help prevent these from being uploaded to GitHub.