const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ ok: false, message: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).send({ ok: false, message: "Token inválido o expirado" });
  }
}

module.exports = { verifyToken };