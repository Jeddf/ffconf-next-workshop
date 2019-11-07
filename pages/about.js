import Link from "next/link";

export default () => (
  <>
    <h1>About</h1>
    <p>
      I live in Sheffield. I am on the Twitters. I have cats and <s>kids</s>.
    </p>
    <p>
      <Link href="/contact">Contact me</Link> to get in touch
    </p>
  </>
);
