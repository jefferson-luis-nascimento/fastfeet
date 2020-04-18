export default (req, res, next) => {
  const { admin } = req;

  if (!admin) {
    return res.status(401).json({ error: 'User is not a administrator.' });
  }

  return next();
};
