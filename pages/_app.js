import App from "next/app";
import Link from "next/link";
import Layout from "../components/Layout";
import { appWithUser } from "../lib/withUser";
import { MDXProvider } from "@mdx-js/react";
const components = {
  a: ({ children, href, ...props }) => (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  )
};

class MyApp extends App {
  // you can also add to page props here, but in our case we don't need to
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {};
  //
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }
  //
  //   return { pageProps };
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <MDXProvider components={components}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    );
  }
}

export default appWithUser(MyApp);
