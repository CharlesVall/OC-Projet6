module.exports = (req, res, next) => {
  const secret = req.headers['x-admin-key'];
  if (!secret || secret !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  next();
};