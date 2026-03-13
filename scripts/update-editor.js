import { execSync } from 'child_process';

const REPO_URL = "https://github.com/LilFroggy/BingoHelper-Guide-Editor.git";

console.log("🚀 Syncing BingoHelper Guide Editor...");

try {
    execSync(`git remote set-url origin ${REPO_URL}`);

    // 1. Fetch the latest data without merging yet
    execSync('git fetch origin main');

    // 2. Reset everything EXCEPT ignored files (like drafts/)
    // This tells Git: "Make my local files match GitHub exactly."
    // '--hard' will overwrite local changes to scripts/schemas, but NOT ignored folders.
    execSync('git reset --hard origin/main');

    console.log("\n\x1b[32m%s\x1b[0m", "✅ Update successful! Core files (schemas/scripts) have been refreshed.");
    console.log("Your guides in /drafts remain untouched.");

} catch (error) {
    console.error("\n\x1b[31m%s\x1b[0m", "❌ Update failed.");
    console.log("Details:", error.message);
}