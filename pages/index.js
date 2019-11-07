import Link from "next/link";
import Layout from "~/components/Layout";
import fetch from "isomorphic-unfetch";

const Page = ({ sessions }) => (
  <Layout>
    <h1>Talks</h1>
    <ul>
      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .title {
          font-weight: bold;
          margin-bottom: 0;
        }
        a {
          color: black;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .info {
          margin-top: 0;
          padding-bottom: 20px;
        }
        .info span:after {
          content: "•";
          margin: 0 10px;
        }
        .info span:last-child:after {
          display: none;
        }
        .info .speaker {
          display: ${process.env.HIDE_SPEAKERS ? "none" : "auto"};
        }
      `}</style>
      {sessions.map(session => (
        <li key={session.slug}>
          <p className="title">
            <span>#{session.order} </span>
            <Link href="/session/[slug]" as={`/session/${session.slug}`}>
              <a>{session.title}</a>
            </Link>
          </p>
          <p className="info">
            <span className="speaker name">{session.speaker.name} </span>
            <span className="speaker twitter">
              <a
                href={`https://twitter.com/${session.speaker.twitter}`}
                target="_blank"
              >
                @{session.speaker.twitter}
              </a>
            </span>
          </p>
        </li>
      ))}
    </ul>
  </Layout>
);

Page.getInitialProps = async () => {
  const res = await fetch(`https://ffconf.org/api/event/2019`);
  const sessions = await res.json();
  return {
    sessions
  };
};

export default Page;
