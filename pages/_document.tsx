import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-[#f2f4f5]">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
