export const ADMIN_TOKEN_KEY = "earthmool-admin-token";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function adminFetch(input, options = {}) {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(input, { ...options, headers });

  if (response.status === 401) {
    window.dispatchEvent(new Event("earthmool:admin-unauthorized"));
  }

  return response;
}

export const getAdminAuthUrl = (path) => `${API_URL}${path}`;
