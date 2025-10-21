#!/usr/bin/env node

/**
 * Structural validation for the About page.
 * Run with: `node tests/about.test.js`
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

function read(file) {
  return fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
}

const html = read('about.html');

function expectToContain(fragment, message) {
  assert(
    html.includes(fragment),
    `✖ ${message} (missing "${fragment})`
  );
  console.log(`  ✓ ${message}`);
}

function expect(pattern, message) {
  assert(
    pattern.test(html),
    `✖ ${message}`
  );
  console.log(`  ✓ ${message}`);
}

try {
  console.log('Validating About page skeleton…');
  expect(
    /<main[^>]+data-testid="test-about-page"[^>]+role="main"/i,
    'Main element exposes data-testid="test-about-page"\n'
  );

  const sections = [
    { id: 'test-about-bio', heading: 'about-bio-heading' },
    { id: 'test-about-goals', heading: 'about-goals-heading' },
    { id: 'test-about-confidence', heading: 'about-confidence-heading' },
    { id: 'test-about-future-note', heading: 'about-future-heading' },
    { id: 'test-about-extra', heading: 'about-extra-heading' }
  ];

  console.log('Checking required sections and aria-labelledby relationships…');
  sections.forEach(({ id, heading }) => {
    expectToContain(`data-testid="${id}"`, `Found ${id}`);
    expect(
      new RegExp(`<section[^>]+data-testid="${id}"[^>]+aria-labelledby="${heading}"`, 'i'),
      `${id} section references its heading with aria-labelledby`
    );
    expect(
      new RegExp(`<h3[^>]+id="${heading}"`, 'i'),
      `${heading} heading is present\n`
    );
  });

  console.log('\nAll About page checks passed ✅');
  process.exit(0);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
