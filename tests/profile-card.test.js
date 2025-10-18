#!/usr/bin/env node

/**
 * Simple structural tests for the HNG Stage 0 profile card.
 * Run with: `node tests/profile-card.test.js`
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

function read(file) {
  return fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
}

const html = read('index.html');

function expectContains(fragment, message) {
  assert(
    html.includes(fragment),
    `✖ ${message} (missing "${fragment}")`
  );
  console.log(`  ✓ ${message}`);
}

try {
  // Required data-testid attributes from the prerequisite.
  console.log('Checking required data-testid attributes…');
  [
    'test-profile-card',
    'test-user-name',
    'test-user-bio',
    'test-user-avatar',
    'test-user-time',
    'test-user-social-links',
    'test-user-hobbies',
    'test-user-dislikes'
  ].forEach((id) => {
    expectContains(`data-testid="${id}"`, `Found ${id}`);
  });

  // Ensure each social link opens in a new tab with proper rel.
  console.log('Validating social link targets…');
  const socialNetworks = ['github', 'twitter', 'linkedin', 'website'];
  socialNetworks.forEach((network) => {
    const pattern = new RegExp(
      `<a[^>]+data-testid="test-user-social-${network}"[^>]+target="_blank"[^>]+rel="noopener noreferrer"`,
      'i'
    );
    assert(
      pattern.test(html),
      `✖ Social link for ${network} should open in a new tab with rel="noopener noreferrer"`
    );
    console.log(`  ✓ Social link ${network} opens safely in new tab`);
  });

  // Verify the live time element references Date.now() in script.js
  console.log('Checking live time implementation…');
  const script = read('script.js');
  assert(
    /Date\.now\(\)/.test(script),
    '✖ script.js should set current time using Date.now()'
  );
  console.log('  ✓ Date.now() used for live time');

  console.log('\nAll checks passed ✅');
  process.exit(0);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
