import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

let AuthRoutes = (app, router) => {

  router.route('/authenticate')

    /*
      POST api/authenticate { username, password }
    */
    .post((req, res) => {
      if (req.body.username === undefined || req.body.password === undefined) {
        return res.status(400).send();
      }

      User.findOne({
        username: req.body.username
      })
      .then(user => {
        if (!user) throw 'username';
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) throw 'password';

        const payload = { username: req.body.username };
        const token = jwt.sign(payload, app.get('secret'), {
          expiresIn: '1440m' // 24h
        });

        res.json({ token: token });
      })
      .catch(err => res.status(500).send(err));
    });
};

export default AuthRoutes;