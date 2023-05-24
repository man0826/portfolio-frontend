import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "@/lib/apolloClient";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = initializeApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Pf</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/rsi8jrc.css" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
