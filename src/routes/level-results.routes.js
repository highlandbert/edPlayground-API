import LevelResults from '../models/level-results.model';
import { JwtAuth } from '../middlewares';

let LevelResultsRoutes = (app, router) => {

  router.route('/levelsResults')

    /*
      POST api/levelsResults { levelResults }
    */
    .post((req, res) => {
      LevelResults.updateOne(
          { level: req.body.levelId, user: req.body.userId },
          { seconds: req.body.seconds },
          { upsert: true })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/levelsResults/ranking/:seconds/level/:levelId')

    .get(JwtAuth(app), (req, res) =>
      LevelResults.count({
        level: req.params.levelId,
        seconds: { $lt: req.params.seconds }
      })
      .then(count => res.json(count + 1))
      .catch(err => res.status(404).send(err))
    );

  router.route('/levelsResults/user/:userId/level/:levelId')

    /*
      GET /api/levelsResults/user/id/level/id
    */
    .get(JwtAuth(app), (req, res) =>
      LevelResults.findOne({
        level: req.params.levelId,
        user: req.params.userId
      })
      .populate('level', 'order')
      .then(levelResults => res.json(levelResults))
      .catch(err => res.status(404).send(err))
    )

    /*
      PUT /api/levelsResults/user/id/level/id { seconds }
    */
    .put(JwtAuth(app), (req, res) => {
      LevelResults.findOne({
        level: req.params.levelId,
        user: req.params.userId
      })
      .then(levelResults => {
        levelResults.seconds = req.body.seconds || levelResults.seconds;
        return levelResults;
      })
      .then(levelResults => levelResults.save())
      .then(() => res.json({ done: true }))
      .catch(err => res.status(400).send(err));
    });
};

export default LevelResultsRoutes;