import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "@/lib/apolloClient";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = initializeApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
