import LevelResults from '../models/level-results.model';
import { JwtAuth } from '../middlewares';
import { Level } from '../../../learn/src/data/model';

let LevelResultsRoutes = (app, router) => {

  router.route('/levelsResults')

    /*
      POST api/levelsResults { levelResults }
    */
    .post(JwtAuth(app), (req, res) => {
      let levelResults = new LevelResults();
      levelResults.seconds = req.body.seconds;
      levelResults.level = req.body.levelId;
      levelResults.user = req.body.userId;

      levelResults.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/levelsResults/ranking/:seconds')

    .get(JwtAuth(app), (req, res) =>
      LevelResults.count({
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
    })
};

export default LevelResultsRoutes;