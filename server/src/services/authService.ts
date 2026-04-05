import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { signToken } from "../utils/jwt.js";
import { googleAuthService } from "./googleAuthService.js";

export const authService = {
  async signup(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash, authProvider: "LOCAL" }
    });

    const token = signToken({ userId: user.id, email: user.email, name: user.name });

    return { token, user };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    if (!user.passwordHash || user.authProvider === "GOOGLE") {
      throw new Error("This account uses Google sign-in. Continue with Google.");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new Error("Invalid email or password.");
    }

    const token = signToken({ userId: user.id, email: user.email, name: user.name });

    return { token, user };
  },

  async googleAuth(idToken: string) {
    const profile = await googleAuthService.verifyIdToken(idToken);

    const existingByEmail = await prisma.user.findUnique({
      where: { email: profile.email }
    });

    let user;

    if (existingByEmail) {
      user = await prisma.user.update({
        where: { id: existingByEmail.id },
        data: {
          name: profile.name,
          googleId: profile.googleId,
          avatarUrl: profile.avatarUrl,
          authProvider: "GOOGLE"
        }
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: profile.name,
          email: profile.email,
          googleId: profile.googleId,
          avatarUrl: profile.avatarUrl,
          authProvider: "GOOGLE"
        }
      });
    }

    const token = signToken({ userId: user.id, email: user.email, name: user.name });

    return { token, user };
  }
};
