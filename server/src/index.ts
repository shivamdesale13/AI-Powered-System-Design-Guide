import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { env } from "./config/env.js";
import { typeDefs } from "./graphql/typeDefs/schema.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { createContext } from "./middleware/context.js";

const isAllowedOrigin = (origin: string) => {
  const allowedOrigins = new Set([env.CLIENT_URL]);

  try {
    const parsed = new URL(origin);
    const isLocalhost =
      (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") &&
      /^http:$/.test(parsed.protocol);

    return allowedOrigins.has(origin) || isLocalhost;
  } catch {
    return false;
  }
};

const start = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || isAllowedOrigin(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error(`Origin ${origin} is not allowed by CORS.`));
      },
      credentials: true
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });
  app.use("/graphql", expressMiddleware(server, { context: createContext }));

  app.listen(env.PORT, () => {
    console.log(`GraphQL API running at http://localhost:${env.PORT}/graphql`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
