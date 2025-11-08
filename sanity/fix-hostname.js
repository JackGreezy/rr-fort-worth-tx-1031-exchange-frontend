#!/usr/bin/env node
/**
 * Fix Sanity hostname via Management API
 * This bypasses the CLI bug completely
 */

const https = require('https');

const PROJECT_ID = 'x5mdofpa';
const HOSTNAME = process.argv[2] || '1031ny';

if (!process.env.SANITY_AUTH_TOKEN) {
  console.error('ERROR: SANITY_AUTH_TOKEN environment variable not set');
  console.error('');
  console.error('To fix this:');
  console.error('1. Go to https://manage.sanity.io');
  console.error(`2. Select project ${PROJECT_ID}`);
  console.error('3. Go to API → Tokens → Add API token');
  console.error('4. Create token with "Editor" or "Administrator" permissions');
  console.error('5. Run: export SANITY_AUTH_TOKEN="your-token-here"');
  console.error(`6. Then run: node fix-hostname.js ${HOSTNAME}`);
  process.exit(1);
}

const token = process.env.SANITY_AUTH_TOKEN;

const data = JSON.stringify({
  hostname: HOSTNAME
});

const options = {
  hostname: 'api.sanity.io',
  port: 443,
  path: `/v2021-06-07/projects/${PROJECT_ID}/studioHostname`,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    'Authorization': `Bearer ${token}`
  }
};

console.log(`Setting hostname to: ${HOSTNAME}.sanity.studio`);
console.log(`Project: ${PROJECT_ID}`);
console.log('');

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('✓ SUCCESS! Hostname set successfully!');
      console.log('');
      console.log('Now run: npx sanity deploy');
      process.exit(0);
    } else {
      console.error(`✗ FAILED: HTTP ${res.statusCode}`);
      console.error('Response:', responseData);
      if (res.statusCode === 401) {
        console.error('');
        console.error('Authentication failed. Check your SANITY_AUTH_TOKEN.');
      } else if (res.statusCode === 409) {
        console.error('');
        console.error('Hostname already taken. Try a different one.');
      }
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('✗ ERROR:', error.message);
  process.exit(1);
});

req.write(data);
req.end();

