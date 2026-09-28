import { COGNITO } from '../config/cognitoConfig';

const TOKEN_KEY = 'idToken';
const ACCESS_KEY = 'accessToken';

export const authService = {
  login() {
    const params = new URLSearchParams({
      client_id: COGNITO.clientId,
      response_type: 'token',
      scope: 'openid email profile',
      redirect_uri: COGNITO.redirectUri,
    });
    window.location.href = `${COGNITO.domain}/login?${params.toString()}`;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ACCESS_KEY);
    const params = new URLSearchParams({
      client_id: COGNITO.clientId,
      logout_uri: COGNITO.logoutUri,
    });
    window.location.href = `${COGNITO.domain}/logout?${params.toString()}`;
  },

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setTokens({ idToken, accessToken }) {
    if (idToken) localStorage.setItem(TOKEN_KEY, idToken);
    if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
  },
};