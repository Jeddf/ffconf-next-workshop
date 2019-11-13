import { Component, useState, useContext, createContext } from "react";
import fetch from "isomorphic-unfetch";
import { getApiUrl } from "~/lib/getApiUrl";
import router from "next/router";

export async function logout() {
  await fetch(`${getApiUrl(false)}/user`, {
    method: "delete"
  });
  router.reload();
}

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

export const UserContext = createContext();
UserContext.displayName = "UserContext";

export const UserProvider = ({ initialUser, children }) => {
  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    return [];
  }

  return [ctx.user, ctx.setUser];
};
