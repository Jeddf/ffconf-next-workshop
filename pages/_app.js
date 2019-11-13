import App from "next/app";
import Link from "next/link";
import Layout from "../components/Layout";
import { UserProvider, getUser } from "../lib/authentication";
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
  static async getInitialProps({ Component, ctx }) {
    const user = await getUser(ctx.req);
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, user };
  }

  render() {
    const { Component, pageProps, user: initialUser } = this.props;
    return (
      <UserProvider initialUser={initialUser}>
        <MDXProvider components={components}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </UserProvider>
    );
  }
}

export default MyApp;
