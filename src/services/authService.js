import { COGNITO } from '../config/cognitoConfig';

const TOKEN_KEY = 'idToken';
const ACCESS_KEY = 'accessToken';
const VERIFIER_KEY = 'pkceVerifier';

function generateRandomString(length = 64) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  return Array.from(
    randomValues,
    (value) => characters[value % characters.length]
  ).join('');
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);

  const digest = await crypto.subtle.digest('SHA-256', data);

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const authService = {
  async login() {
    const verifier = generateRandomString();

    sessionStorage.setItem(VERIFIER_KEY, verifier);

    const challenge = await generateCodeChallenge(verifier);

    const params = new URLSearchParams({
      client_id: COGNITO.clientId,
      response_type: 'code',
      scope: 'openid email',
      redirect_uri: COGNITO.redirectUri,
      code_challenge: challenge,
      code_challenge_method: 'S256',
    });

    window.location.href =
      `${COGNITO.domain}/oauth2/authorize?${params.toString()}`;
  },

  async handleCallback(code) {
    const verifier = sessionStorage.getItem(VERIFIER_KEY);

    if (!verifier) {
      throw new Error('PKCE verifier not found.');
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: COGNITO.clientId,
      code,
      redirect_uri: COGNITO.redirectUri,
      code_verifier: verifier,
    });

    const response = await fetch(`${COGNITO.domain}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Authentication failed: ${error}`);
    }

    const tokens = await response.json();

    this.setTokens({
      idToken: tokens.id_token,
      accessToken: tokens.access_token,
    });

    sessionStorage.removeItem(VERIFIER_KEY);

    return tokens;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(VERIFIER_KEY);

    const params = new URLSearchParams({
      client_id: COGNITO.clientId,
      logout_uri: COGNITO.logoutUri,
    });

    window.location.href =
      `${COGNITO.domain}/logout?${params.toString()}`;
  },

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setTokens({ idToken, accessToken }) {
    if (idToken) {
      localStorage.setItem(TOKEN_KEY, idToken);
    }

    if (accessToken) {
      localStorage.setItem(ACCESS_KEY, accessToken);
    }
  },
};