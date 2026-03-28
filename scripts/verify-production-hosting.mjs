/**
 * Debug: records HTTP status for toxiqmynd.com root vs /ai-art-portfolio/ (session 1c91ce).
 * Run: node scripts/verify-production-hosting.mjs
 */
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const LOG =
  '/Users/justindilbeck/Cursor Projects/Project 1/.cursor/debug-1c91ce.log';

function curlCode(url) {
  try {
    return execSync(
      `curl -sS -o /dev/null -w "%{http_code}" "${url}"`,
      { encoding: 'utf8' },
    ).trim();
  } catch {
    return 'err';
  }
}

function logLine(payload) {
  fs.appendFileSync(
    LOG,
    JSON.stringify({
      sessionId: '1c91ce',
      timestamp: Date.now(),
      ...payload,
    }) + '\n',
  );
}

// #region agent log
const root = curlCode('https://toxiqmynd.com/');
const sub = curlCode('https://toxiqmynd.com/ai-art-portfolio/');
const aboutWrong = curlCode('https://toxiqmynd.com/ai-art-portfolio/about/');
const aboutRight = curlCode('https://toxiqmynd.com/about/');
logLine({
  hypothesisId: 'H1',
  location: 'verify-production-hosting.mjs',
  message: 'GitHub Pages custom domain serves site at domain root, not /ai-art-portfolio/',
  data: {
    'GET /': root,
    'GET /ai-art-portfolio/': sub,
    'GET /ai-art-portfolio/about/': aboutWrong,
    'GET /about/': aboutRight,
  },
  runId: 'pre-fix',
});
// #endregion

console.log('Wrote', LOG);
console.log({ root, sub, aboutWrong, aboutRight });
