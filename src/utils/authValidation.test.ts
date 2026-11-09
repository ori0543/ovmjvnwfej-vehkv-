import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEmailOrPhone, validatePassword, normalizeAccountIdentifier } from './authValidation';

test('validateEmailOrPhone empty input returns Hebrew error', () => {
  const result = validateEmailOrPhone('', 'he');
  assert.equal(result.isValid, false);
  assert.equal(result.errorMessage, 'יש להזין כתובת אימייל או מספר טלפון');
});

test('validateEmailOrPhone empty input with english returns English error', () => {
  const result = validateEmailOrPhone('  ', 'en');
  assert.equal(result.isValid, false);
  assert.equal(result.errorMessage, 'Enter an email or phone number');
});

test('validateEmailOrPhone valid email or username passes', () => {
  const result = validateEmailOrPhone('user@example.com', 'he');
  assert.equal(result.isValid, true);
  assert.equal(result.errorMessage, undefined);

  const usernameResult = validateEmailOrPhone('john.doe', 'he');
  assert.equal(usernameResult.isValid, true);
});

test('validateEmailOrPhone valid phone passes', () => {
  const result = validateEmailOrPhone('+972501234567', 'he');
  assert.equal(result.isValid, true);
});

test('validatePassword empty returns error', () => {
  const result = validatePassword('', 'he');
  assert.equal(result.isValid, false);
  assert.equal(result.errorMessage, 'יש להזין סיסמה');
});

test('validatePassword short returns wrong password message', () => {
  const result = validatePassword('123', 'he');
  assert.equal(result.isValid, false);
  assert.match(result.errorMessage || '', /סיסמה שגויה/);
});

test('validatePassword valid password passes', () => {
  const result = validatePassword('secret1234', 'he');
  assert.equal(result.isValid, true);
});

test('normalizeAccountIdentifier appends @gmail.com for plain username', () => {
  assert.equal(normalizeAccountIdentifier('myuser'), 'myuser@gmail.com');
  assert.equal(normalizeAccountIdentifier('user@domain.com'), 'user@domain.com');
  assert.equal(normalizeAccountIdentifier('+972501234567'), '+972501234567');
});
