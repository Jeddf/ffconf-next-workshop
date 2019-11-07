import Link from "next/link";
import Layout from '../components/Layout';

export default () => (
  <Layout>
    <h1>About</h1>
    <p>
      I live in Sheffield. I am on the Twitters. I have cats and <s>kids</s>.
    </p>
    <p>
      <a><Link href="/contact">Contact me</Link> to get in touch</a>
    </p>
  </Layout>
);
