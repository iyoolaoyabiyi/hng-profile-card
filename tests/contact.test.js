#!/usr/bin/env node

/**
 * Structural validation for the Contact page.
 * Run with: `node tests/contact.test.js`
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

function read(file) {
  return fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
}

const html = read('contact.html');
const markup = html.replace(/\s+/g, ' ');

function expect(pattern, message) {
  assert(
    pattern.test(html),
    `✖ ${message}`
  );
  console.log(`  ✓ ${message}`);
}

function expectMarkup(pattern, message) {
  assert(
    pattern.test(markup),
    `✖ ${message}`
  );
  console.log(`  ✓ ${message}`);
}

function getElement(testId) {
  const match = markup.match(new RegExp(`<[^>]+data-testid="${testId}"[^>]*>`, 'i'));
  return match ? match[0] : '';
}

try {
  console.log('Checking required data-testid attributes…');
  [
    'test-contact-form',
    'test-contact-name',
    'test-contact-email',
    'test-contact-subject',
    'test-contact-message',
    'test-contact-submit',
    'test-contact-success',
    'test-contact-error-name',
    'test-contact-error-email',
    'test-contact-error-subject',
    'test-contact-error-message'
  ].forEach((id) => {
    expect(new RegExp(`data-testid="${id}"`, 'i'), `Found ${id}`);
  });

  console.log('Validating input constraints…');
  expect(
    /<form[^>]+data-testid="test-contact-form"[^>]+novalidate/i,
    'Form disables native validation to allow custom handling'
  );
  const nameInput = getElement('test-contact-name');
  assert(nameInput.includes('required'), '✖ Full name input must be marked required');
  assert(nameInput.includes('aria-describedby="contact-error-name"'), '✖ Full name input should reference contact-error-name');
  console.log('  ✓ Full name input is required and references its error message');

  const emailInput = getElement('test-contact-email');
  assert(emailInput.includes('type="email"'), '✖ Email input must use type="email"');
  assert(emailInput.includes('required'), '✖ Email input must be marked required');
  assert(emailInput.includes('aria-describedby="contact-error-email"'), '✖ Email input should reference contact-error-email');
  console.log('  ✓ Email input uses type=email, is required, and references its error message');

  const subjectInput = getElement('test-contact-subject');
  assert(subjectInput.includes('required'), '✖ Subject input must be marked required');
  assert(subjectInput.includes('aria-describedby="contact-error-subject"'), '✖ Subject input should reference contact-error-subject');
  console.log('  ✓ Subject input is required and references its error message');

  const messageTextarea = getElement('test-contact-message');
  assert(messageTextarea.includes('required'), '✖ Message textarea must be required');
  assert(messageTextarea.includes('minlength="10"'), '✖ Message textarea must enforce minlength="10"');
  assert(messageTextarea.includes('aria-describedby="contact-error-message"'), '✖ Message textarea should reference contact-error-message');
  console.log('  ✓ Message textarea is required, enforces minlength 10, and references its error message');

  console.log('Ensuring error message containers exist with IDs…');
  [
    { id: 'contact-error-name', testId: 'test-contact-error-name' },
    { id: 'contact-error-email', testId: 'test-contact-error-email' },
    { id: 'contact-error-subject', testId: 'test-contact-error-subject' },
    { id: 'contact-error-message', testId: 'test-contact-error-message' }
  ].forEach(({ id, testId }) => {
    expect(
      new RegExp(`<p[^>]+id="${id}"[^>]+data-testid="${testId}"[^>]*aria-live="polite"`, 'i'),
      `${id} error element exposes data-testid and aria-live`
    );
  });

  console.log('Checking success message container…');
  expect(
    /<div[^>]+data-testid="test-contact-success"[^>]+role="status"[^>]+aria-live="polite"[^>]+\bclass\s*=\s*(?:(?:'[^']*\bhidden\b[^']*')|(?:"[^"]*\bhidden\b[^"]*"))/i,
    'Success message is present, polite live region, and uses hidden class by default'
  );

  console.log('\nAll Contact page checks passed ✅');
  process.exit(0);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
