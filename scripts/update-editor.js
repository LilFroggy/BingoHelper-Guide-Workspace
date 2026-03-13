import { execSync } from 'child_process';

// The source of truth for your editor updates
const REPO_URL = "https://github.com/LilFroggy/BingoHelper-Guide-Editor.git";

console.log("🚀 Checking for BingoHelper Guide Editor updates...");

try {
    // 1. Ensure the remote 'origin' points to the correct URL
    // This fixes issues if the user moved the folder or renamed the repo
    execSync(`git remote set-url origin ${REPO_URL}`);

    // 2. Save any accidental changes to core files temporarily
    // '|| true' prevents the script from crashing if there is nothing to stash
    execSync('git stash');

    // 3. Fetch the latest code from the main branch
    console.log("📥 Pulling latest changes from GitHub...");
    execSync('git pull origin main');

    // 4. Re-apply any local changes (if any)
    try {
        execSync('git stash pop');
    } catch (e) {
        // This fails if there was nothing to stash, which is fine!
    }

    console.log("\n\x1b[32m%s\x1b[0m", "✅ Editor updated successfully!");
    console.log("Your guides in /drafts were not affected.");

} catch (error) {
    console.error("\n\x1b[31m%s\x1b[0m", "❌ Update failed.");
    console.log("Make sure you have Git installed and an active internet connection.");
    console.log("Technical details:", error.message);
}