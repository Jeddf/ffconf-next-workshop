import Link from "next/link";

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
            <img className="avatar" src={user.avatar} />
          ) : (
            <Link href="/login">
              <a>Log in</a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  </header>
);

Header.defaultProps = {
  user: null
};

export default Header;
