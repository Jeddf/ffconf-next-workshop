import Link from "next/link";
import Layout from "../components/Layout";
import sessions from "../data/sessions.json";

const Page = () => (
  <Layout>
    <h1>Talks</h1>
    <ul>
      {sessions.map(session => (
        <li key={session.slug}>
          <p className="title">
            <Link href={`/session?slug=${session.slug}`}>
              <a>{session.title}</a>
            </Link>
          </p>
          <p className="info">
            <span>⏰ {session.time}</span>
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

export default Page;
