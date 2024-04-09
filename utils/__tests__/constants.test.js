const { AUTH_COOKIE, AUTH_COOKIE_LIFETIME } = require('../constants');

describe('Testing AUTH_COOKIE', () => {
  it('has correct value', () => {
    expect(AUTH_COOKIE).toBe('signals_cookie');
  });
});

describe('Testing AUTH_COOKIE_LIFETIME', () => {
  it('has correct value', () => {
    expect(AUTH_COOKIE_LIFETIME).toBe(86400);
  });
});
