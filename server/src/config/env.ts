import dotenv from "dotenv";
import path from "node:path";
import { z } from "zod";

const candidatePaths = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "../.env"),
  path.resolve(process.cwd(), "../../.env")
];

for (const envPath of candidatePaths) {
  const result = dotenv.config({ path: envPath });
  if (!result.error) {
    break;
  }
}

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(12),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
  PORT: z.coerce.number().default(4000),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4.1-mini"),
  GOOGLE_CLIENT_ID: z.string().optional()
});

export const env = envSchema.parse(process.env);
