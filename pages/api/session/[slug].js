export default async (req, res) => {
  const sessionData = require(`../../../data/${req.query.slug}.json`);
  res.status(200).json(sessionData);
};
