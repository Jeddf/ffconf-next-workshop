import { useState } from "react";
import { withRouter } from "next/router";
import { useUser } from "~/lib/authentication";
import { getApiUrl } from "~/lib/getApiUrl";

const Login = ({ req, router }) => {
  const [, setUser] = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmail = e => {
    setEmail(e.target.value);
    setError(null);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const res = await fetch(`${getApiUrl(false)}/user`, {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        password,
        email
      })
    });

    const json = await res.json();

    if (res.status > 201) {
      setError(json.error);
      return;
    }

    router.push("/");
    setUser(json);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <style jsx>{`
          form {
            max-width: 400px;
            margin: 0 auto;
          }
          div {
            display: flex;
            flex-direction: column;
            margin: 28px 0;
          }

          label {
            font-weight: bold;
          }

          input {
            font-size: 1rem;
            padding: 5px;
            border-radius: 2px;
            border: 1px solid #ddd;
          }

          .btn {
            background: rgb(3, 169, 244);
            color: white;
            border: 0;
            padding: 10px 20px;
            margin: 0 auto;
            max-width: 200px;
            cursor: pointer;
          }

          .btn:hover {
            background: rgb(25, 118, 210);
          }

          .error {
            border: 1px solid rgb(233, 30, 99);
            padding: 7px 10px;
            border-radius: 2px;
            background: rgb(252, 228, 236);
          }
        `}</style>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={handleEmail}
            type="email"
            placeholder="you@email.com"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={handlePassword}
            type="password"
            id="password"
          />
        </div>
        {error && (
          <p className="error">
            There was problem with the submission: {error}
          </p>
        )}
        <div>
          <input className="btn" type="submit" value="Sign in" />
        </div>
      </form>
    </>
  );
};

export default withRouter(Login);
