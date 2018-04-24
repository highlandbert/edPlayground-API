import Level from '../models/level.model';
import { JwtAuth } from '../middlewares';

let LevelRoutes = (app, router) => {

  router.route('/levels')

    /*
      POST api/levels { level }
    */
    .post(JwtAuth(app), (req, res) => {
      let level = new Level();
      level.name = req.body.name;
      level.order = req.body.order;
      level.lesson = req.body.lessonId;

      level.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/levels/lesson/:id')

    /*
    GET /api/levels/lesson/lessonId
    */
    .get(JwtAuth(app), (req, res) =>
      Level.find({ lesson: req.params.id })
        .then(levels => res.json(levels))
        .catch(err => res.status(404).send(err))
    );

  router.route('/levels/:id')

    /*
      GET /api/levels/levelId
    */
    .get(JwtAuth(app), (req, res) =>
      Level.findById(req.params.id)
        .then(level => res.json(level))
        .catch(err => res.status(404).send(err))
    )

    /*
      PUT /api/levels/id { level }
    */
    .put(JwtAuth(app), (req, res) => {
      Level.findById(req.params.id)
        .then(level => {
          level.name = req.body.name || level.name;
          level.order = req.body.order || level.order;
          return level;
        })
        .then(level => level.save())
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      DELETE /api/levels/id
    */
    .delete(JwtAuth(app), (req, res) =>
      Level.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(404).send(err))
    );
};

export default LevelRoutes;