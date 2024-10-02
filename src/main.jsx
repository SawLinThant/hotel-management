import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import createApolloClient from "./graphql/apolloClient.js";
import { ApolloProvider } from "@apollo/client";
import { AccountProvider } from "./lib/context/account-context.jsx";

const apolloClient = createApolloClient();

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={apolloClient}>
  <StrictMode>
    <BrowserRouter>
    <AccountProvider>
      <App />
    </AccountProvider>
    </BrowserRouter>
  </StrictMode>
  </ApolloProvider>
);
