import fetch from "isomorphic-unfetch";
import Error from "./_error";
import Layout from "../components/Layout";

const Page = ({ error, session: { speaker, ...session } = {} }) => {
  if (error) {
    return <Error message={error} />;
  }
  return session ? (
    <Layout>
      <h1>{session.title}</h1>
      <p>⏰ {session.time}</p>
      {session.description.split(/\n/).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <div className="speaker">
        <style jsx>{`
          .speaker {
            display: flex;
            align-items: flex-start;
            margin-top: 40px;
          }

          h2 {
            margin-top: 0;
          }

          img {
            border-radius: 5px;
            width: 200px;
            object-fit: scale-down;
            margin-left: 5px;
          }

          blockquote {
            font-style: italic;
            border-left: 5px solid #ccc;
            padding-left: 20px;
            margin-left: 2px;
          }

          h2,
          h3,
          img {
            display: auto;
          }
        `}</style>
        <div>
          <h2>About {speaker.name}</h2>
          <h3>
            <a href={`https://twitter.com/${speaker.twitter}`}>
              @{speaker.twitter}
            </a>
          </h3>
          <p>What's your tech origin story?</p>
          <blockquote>
            {speaker.bio.split(/\n/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </blockquote>
        </div>
        <img src={speaker.photo} />
      </div>
    </Layout>
  ) : (
    <Layout>
      <p>oh</p>
    </Layout>
  );
};

Page.getInitialProps = async ({ query: { slug } }) => {
  const res = await fetch(`https://ffconf.org/api/session/${slug}`);

  if (res.status !== 200) {
    return { error: `Session ${slug} failed to load!` };
  }

  const session = await res.json();
  return {
    session
  };
};

export default Page;
