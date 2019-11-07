import { Component, useState, useContext, createContext } from "react";
import fetch from "isomorphic-unfetch";
import { getApiUrl } from "~/lib/getApiUrl";

export async function getUser(req = false) {
  // if we remain on the client side, let's cache to speed things up
  if (!req) {
    if (window.__user) {
      return window.__user;
    }
  }

  const options = { credentials: "same-origin" };

  // if we have a request, we're on the server, so add the cookie
  if (req) {
    options.headers = {
      cookie: req.headers.cookie
    };
  }

  const res = await fetch(`${getApiUrl(req)}/user`, options);

  if (res.status === 200) {
    const user = await res.json();

    if (!req) {
      // eslint-disable-next-line require-atomic-updates
      window.__user = user;
    }
    return user;
  }

  return null;
}

export const withUser = Page => {
  return class PageWithUser extends Component {
    static async getInitialProps(ctx) {
      const user = await getUser(ctx.req);

      let props = {};
      if (typeof Page.getInitialProps === "function") {
        props = await Page.getInitialProps.call(Page, ctx);
      }

      props.user = user;

      return props;
    }

    render() {
      return <Page {...this.props} />;
    }
  };
};

export const appWithUser = App => {
  return class AppWithUser extends Component {
    static async getInitialProps(appContext) {
      const user = await getUser(appContext.ctx.req);

      appContext.ctx.user = user;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      return appProps;
    }

    render() {
      return <App {...this.props} />;
    }
  };
};

//// this bit  👇 will be used a little later

export const UserContext = createContext();
UserContext.displayName = "UserContext";

export const UserProvider = ({ user: _user, children }) => {
  const [user, setUser] = useState(_user);

  return (
    <UserContext.Provider value={{ user, logout: () => setUser(null) }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    return [];
  }

  return [ctx.user, ctx.logout];
};
