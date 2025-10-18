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
}

try {
  // Required data-testid attributes from the prerequisite.
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
    expectContains(`data-testid="${id}"`, `Expected ${id}`);
  });

  // Ensure each social link opens in a new tab with proper rel.
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
  });

  // Verify the live time element references Date.now() in script.js
  const script = read('script.js');
  assert(
    /Date\.now\(\)/.test(script),
    '✖ script.js should set current time using Date.now()'
  );

  console.log('✓ Profile card structure matches prerequisite requirements');
  process.exit(0);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
