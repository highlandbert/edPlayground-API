import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { JwtAuth } from '../middlewares';

let UserRoutes = (app, router) => {

  router.route('/users')

    /*
      POST api/users { user }
    */
    .post((req, res) => {

      let user = new User();

      if (req.body.password !== undefined) {
        user.password = bcrypt.hashSync(req.body.password, 10);
      }

      user.username = req.body.username;
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.mail = req.body.mail;
      user.birth = req.body.birth;

      user.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      GET api/users
    */
    .get(JwtAuth(app), (req, res) =>
      User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).send(err))
    );


  router.route('/users/:id')

    /*
      GET /api/users/id
    */
    .get((req, res) =>
      User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).send(err))
    )

    /*
      PUT /api/users/id { user }
    */
    .put((req, res) => {
      User.findById(req.params.id)
        .then(user => {
          user.name = req.body.name || user.name;
          user.surname = req.body.surname || user.surname;
          user.mail = req.body.mail || user.mail;
          user.birth = req.body.birth || user.birth;

          return user;
        })
        .then(user => user.save())
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      DELETE /api/users/id
    */
    .delete((req, res) =>
      User.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(404).send(err))
    );
};

export default UserRoutes;