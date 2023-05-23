import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: `${API_URL}/graphql`,
    }),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = () => {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};
