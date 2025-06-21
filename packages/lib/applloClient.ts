import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () =>
  new ApolloClient({
    link: new HttpLink({
      uri: "https://3j0em4vs16.execute-api.us-east-1.amazonaws.com/dev/graphql",
    }),
    cache: new InMemoryCache(),
  });

export default createApolloClient;
