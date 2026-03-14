import { useContext } from "react";
import { UserContext } from "./UserContext";

/**
 * @file useUserContext.js
 * @description Custom hook that provides safe access to the user context.
 * Throws if called outside a `UserProvider`.
 *
 * @module useUserContext
 *
 * @returns {{
 *   user: object|null,
 *   loading: boolean,
 *   setUser: Function,
 *   refreshUser: Function,
 *   clearUser: Function,
 * }}
 *
 * @throws {Error} If called outside a `UserProvider`.
 */

export const useUserContext = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useUserContext must be used inside a UserProvider");
  }

  return ctx;
};
