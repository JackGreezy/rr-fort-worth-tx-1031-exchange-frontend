#!/usr/bin/env node
/**
 * Script to set Sanity Studio hostname via Management API
 * This bypasses the CLI bug that crashes during hostname validation
 */

const https = require('https');
const readline = require('readline');

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || 'x5mdofpa';
const HOSTNAME = process.argv[2] || '1031ny';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function setHostname(token) {
  return new Promise((resolve, reject) => {
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
        'Content-Length': data.length,
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✓ Hostname "${HOSTNAME}" set successfully!`);
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Failed to set hostname: ${res.statusCode} - ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

console.log('This script will set your Sanity Studio hostname via the Management API.');
console.log(`Project ID: ${PROJECT_ID}`);
console.log(`Hostname: ${HOSTNAME}.sanity.studio`);
console.log('');
console.log('You need a Sanity Management API token.');
console.log('Get one from: https://manage.sanity.io -> Your Project -> API -> Tokens -> Add API token');
console.log('(Make sure it has "Editor" or "Administrator" permissions)');
console.log('');
rl.question('Enter your Sanity Management API token: ', (token) => {
  if (!token || token.trim() === '') {
    console.error('Error: Token is required');
    process.exit(1);
  }

  setHostname(token.trim())
    .then(() => {
      console.log('');
      console.log('✓ Success! Now you can run: npx sanity deploy');
      rl.close();
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error:', error.message);
      rl.close();
      process.exit(1);
    });
});

