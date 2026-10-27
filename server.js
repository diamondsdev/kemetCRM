/**
 * Production entry point for Hostinger Node.js deployment.
 *
 * Bridges Hostinger's configured startup file ("server.js")
 * to the compiled Express production bundle at "dist/server.cjs".
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compiledServerPath = path.join(__dirname, 'dist', 'server.cjs');

if (!fs.existsSync(compiledServerPath)) {
  console.error(
    `[Hostinger Entry Error] Compiled server bundle not found at: ${compiledServerPath}\n` +
    'Ensure that the build step ("npm run build") ran successfully before startup.'
  );
  process.exit(1);
}

// Execute the compiled CommonJS server bundle in Node.js
await import('./dist/server.cjs');
