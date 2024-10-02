import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT
  });
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log("[graphQLErrors]", graphQLErrors);
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions.code === "invalid-jwt") {
          localStorage.removeItem("token");
          alert("Session Expired, Please Sign In With Your Credentials Again");
        }
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      alert("network connection problem");
    }
  });
  
  const createApolloClient = () => {
    const authLink = setContext(async (_, { headers }) => {
      const token = localStorage.getItem("token");
      try {
        return {
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "", 
            "x-hasura-admin-secret":
            import.meta.env.VITE_APP_HASURA_ADMIN_SECRET,
          },
        };
      } catch (e) {
        return {
          headers,
        };
      }
    });
  
    return new ApolloClient({
      link: errorLink.concat(authLink).concat(httpLink),
      cache: new InMemoryCache(),
    });
  };
  
  export default createApolloClient;