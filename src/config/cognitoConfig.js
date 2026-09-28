export const COGNITO = {
  domain: import.meta.env.VITE_COGNITO_DOMAIN || '',
  clientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
  redirectUri: import.meta.env.VITE_COGNITO_REDIRECT_URI || 'http://localhost:3000/callback',
  logoutUri: import.meta.env.VITE_COGNITO_LOGOUT_URI || 'http://localhost:3000/login',
};