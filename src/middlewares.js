import jwt from 'jsonwebtoken';

export const JwtAuth = (app) => (req, res, next) => {

  if (!app.get('authenticate')) {
    next();
    return;
  }

  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send();
  }

  jwt.verify(token, app.get('secret'), (err, decoded) => {
    if (err) {
      return res.status(403).send(err);
    }

    req.decoded = decoded;
    next();
  });
};

