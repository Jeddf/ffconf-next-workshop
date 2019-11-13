export default async (req, res) => {
  const sessionData = require(`../../../data/2019.json`);
  res.status(200).json(sessionData);
};
