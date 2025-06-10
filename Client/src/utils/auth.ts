import Cookies from "js-cookie";

const TOKEN_KEY = "jwt_token";

export const setToken = (token: string) => {
  // Set cookie with HttpOnly flag, secure flag, and SameSite attribute
  // The cookie will expire in 1 day
  Cookies.set(TOKEN_KEY, token, {
    expires: 1, // 1 day
    secure: true, // Only sent over HTTPS
    sameSite: "strict",
  });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  try {
    // Get the expiration time from the token
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expirationTime;
  } catch {
    removeToken();
    return false;
  }
};
