import Link from "next/link";
import { logout } from "~/lib/authentication";

const Header = ({ user }) => (
  <header>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Talks</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/aboot">
            <a>Aboot</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
        <li className="user">
          {user ? (
            <a onClick={logout}>Log out</a>
          ) : (
            <Link href="/login">
              <a>Log in</a>
            </Link>
          )}
        </li>
      </ul>
      {user ? <strong>Hi {user.name}!</strong> : null}
    </nav>
  </header>
);

Header.defaultProps = {
  user: null
};

export default Header;
