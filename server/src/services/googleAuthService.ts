import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env.js";

const googleClient = env.GOOGLE_CLIENT_ID ? new OAuth2Client(env.GOOGLE_CLIENT_ID) : null;

export type GoogleProfile = {
  googleId: string;
  email: string;
  name: string;
  avatarUrl?: string;
};

export const googleAuthService = {
  async verifyIdToken(idToken: string): Promise<GoogleProfile> {
    if (!googleClient || !env.GOOGLE_CLIENT_ID) {
      throw new Error("Google authentication is not configured on the server.");
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email || !payload.name) {
      throw new Error("Google account information is incomplete.");
    }

    if (payload.email_verified === false) {
      throw new Error("Google email is not verified.");
    }

    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      avatarUrl: payload.picture ?? undefined
    };
  }
};
