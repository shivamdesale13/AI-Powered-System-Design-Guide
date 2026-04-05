import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./AuthProvider";
import { apolloClient } from "../lib/apollo";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>{children}</AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};
