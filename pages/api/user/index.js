import jwt from 'jsonwebtoken';

// dummy user auth process
const secret = process.env.SECRET;
const users = [
  {
    email: 'foo@example.com',
    avatar:
      'https://en.gravatar.com/userimage/394628/6f5c8363fd7b25ae1736a1dd1ecbd85e.jpg?size=200',
  },
];

export const getUser = req => {
  try {
    const data = jwt.decode(req.cookies.token, secret);
    const user = users.find(u => u.email === data.email);
    return user;
  } catch (e) {
    return null;
  }
};

const POST = (req, res) => {
  const user = users.find(u => u.email === req.body.email); // super not-secure

  if (!user) {
    return res.status(400).json({ error: 'Authentication failed' });
  }

  // drop the cookie
  res.setHeader(
    'Set-Cookie',
    `token=${escape(jwt.sign(user, secret))}; Path=/; httpOnly`
  );
  // res.cookies = { token: jwt.sign(user, secret) };
  return res.status(200).json(user);
};

const GET = (req, res) => {
  const user = getUser(req);

  if (user) {
    return res.status(200).json(user);
  }

  return res.status(401).json({ error: "not authed" });
};

export default (req, res) => {
  if (req.method === 'POST') {
    // auth
    return POST(req, res);
  }

  // return user
  return GET(req, res);
};
