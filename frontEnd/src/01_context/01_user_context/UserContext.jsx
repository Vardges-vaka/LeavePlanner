import { createContext, useState, useEffect, useCallback } from "react";

/**
 * @file UserContext.jsx
 * @description React Context + Provider for the authenticated user.
 * On mount it calls `GET /api/users/me` to check if a valid session or
 * JWT cookie exists.  If so, `user` is populated; otherwise it stays `null`.
 *
 * Consumers should always access this through `useUserContext()`.
 *
 * @module UserContext
 *
 * @provides {{
 *   user: object|null,
 *   loading: boolean,
 *   setUser: Function,
 *   refreshUser: Function,
 *   clearUser: Function,
 * }}
 */

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Checks the current auth state with the backend */
  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success && data.data?.user) {
        setUser(data.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /* Clears the user state (called after logout) */
  const clearUser = useCallback(() => {
    setUser(null);
  }, []);

  /* Check auth on initial mount */
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const value = {
    user,
    loading,
    setUser,
    refreshUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};
