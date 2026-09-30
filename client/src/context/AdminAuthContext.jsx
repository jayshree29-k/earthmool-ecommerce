import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAuthContext from "./adminAuthStore";
import {
  ADMIN_TOKEN_KEY,
  adminFetch,
  getAdminAuthUrl,
} from "../services/adminApi";

export function AdminAuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() =>
    localStorage.getItem(ADMIN_TOKEN_KEY)
  );
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(
    localStorage.getItem(ADMIN_TOKEN_KEY)
  ));

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    let isActive = true;

    const validateToken = async () => {
      try {
        const response = await adminFetch(getAdminAuthUrl("/auth/me"));
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Authentication failed.");
        }

        if (isActive) {
          setAdmin(data.admin);
        }
      } catch {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        if (isActive) {
          setAdmin(null);
          setToken(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    validateToken();

    return () => {
      isActive = false;
    };
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      setToken(null);
      setAdmin(null);
      setLoading(false);
      navigate("/admin/login", { replace: true });
    };

    window.addEventListener(
      "earthmool:admin-unauthorized",
      handleUnauthorized
    );

    return () => {
      window.removeEventListener(
        "earthmool:admin-unauthorized",
        handleUnauthorized
      );
    };
  }, [navigate]);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await fetch(getAdminAuthUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to log in.");
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      setAdmin(data.admin);
      return data.admin;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
    setAdmin(null);
    setLoading(false);
    navigate("/admin/login", { replace: true });
  };

  const value = {
    admin,
    token,
    loading,
    isAuthenticated: Boolean(admin && token),
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
