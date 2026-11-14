import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const file = fileURLToPath(new URL('../evidence.json', import.meta.url));

try {
  JSON.parse(readFileSync(file, 'utf8'));
  console.log('evidence.json: valid JSON');
} catch (err) {
  console.error('evidence.json: INVALID - ' + err.message);
  process.exit(1);
}