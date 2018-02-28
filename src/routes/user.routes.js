import User from '../models/user.model';

let UserRoutes = router => {

  router.route('/users')

    /*
      POST api/users { user }
    */
    .post((req, res) => {

      if (!req.body.name || !req.body.mail || !req.body.birth) {
        res.status(400).send();
        return;
      }

      let user = new User();
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.mail = req.body.mail;
      user.birth = req.body.birth;
      user.since = Date.now();

      user.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(500).send(err));
    })

    /*
      GET api/users
    */
    .get((req, res) =>
      User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
    );


  router.route('/users/:id')

    /*
      GET /api/users/id
    */
    .get((req, res) =>
      User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
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
        .catch(err => res.status(500).send(err));
    })

    /*
      DELETE /api/users/id
    */
    .delete((req, res) =>
      User.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(500).send(err))
    );
};

export default UserRoutes;