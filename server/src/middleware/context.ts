import type { Request } from "express";
import { verifyToken } from "../utils/jwt.js";
import type { AuthenticatedContext } from "../types.js";

export const createContext = async ({ req }: { req: Request }): Promise<AuthenticatedContext> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return { user: null };
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    return { user: verifyToken(token) };
  } catch {
    return { user: null };
  }
};

export const requireAuth = (context: AuthenticatedContext) => {
  if (!context.user) {
    throw new Error("Authentication required.");
  }

  return context.user;
};
