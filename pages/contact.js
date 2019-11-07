import Link from "next/link";
import Layout from '~/components/Layout';

export default () => (
  <Layout>
    <h1>Contact</h1>
    <p>
      My name is <strong>Jedd</strong>, you can contact me via the web!
    </p>
    <p>
      Or you can read more <Link href="/about">about me</Link>
    </p>
  </Layout>
);
