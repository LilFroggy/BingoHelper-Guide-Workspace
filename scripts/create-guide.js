import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'node:readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the "Line Reader" interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('📝 Enter the name for your new guide: ', (name) => {
    const guideName = name || 'untitled_guide';
    const fileName = `${guideName.toLowerCase().replace(/\s+/g, '_')}.json`;
    const filePath = path.join(__dirname, '../drafts', fileName);

    const boilerplate = {
        "name": guideName,
        "version": 1,
        "data": {
            "stepIndex": 0,
            "steps": []
        }
    };

    try {
        const draftsDir = path.join(__dirname, '../drafts');
        if (!fs.existsSync(draftsDir)) {
            fs.mkdirSync(draftsDir, { recursive: true });
        }
        
        fs.writeFileSync(filePath, JSON.stringify(boilerplate, null, 4));
        console.log(`\x1b[32m%s\x1b[0m`, `\n✅ Success! Created ${fileName} in drafts.`);
    } catch (err) {
        console.error("\n❌ Error creating guide:", err);
    }

    rl.close(); // Important: Stop listening to the terminal
});