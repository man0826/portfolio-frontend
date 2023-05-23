import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://use.typekit.net/rsi8jrc.css" />
        </Head>
        <body className="bg-[#f2f4f5]">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
