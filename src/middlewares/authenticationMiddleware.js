import jwt from 'jsonwebtoken';

export default async function authenticationMiddleware(req, res, next) {
  const authorization = req.header('Authorization');
  const token = authorization?.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.userId = decoded.userId;
    return next();
  });
}
