import Gold from '../models/gold.model';
import { JwtAuth } from '../middlewares';

let GoldRoutes = (app, router) => {

  router.route('/golds')

    /*
      POST api/golds { gold }
    */
    .post(JwtAuth(app), (req, res) => {
      let gold = new Gold();
      gold.user = req.body.userId;
      gold.answer = req.body.answerId;

      gold.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/golds/answer/:answerId')

    /*
      GET /api/golds/answerId
    */
    .get(JwtAuth(app), (req, res) =>
      Gold.find({ answer: req.params.answerId })
        .then(gold => res.json(gold))
        .catch(err => res.status(404).send(err))
    );

  router.route('/golds/:id')

    /*
      DELETE /api/golds/id
    */
    .delete(JwtAuth(app), (req, res) =>
      Gold.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(404).send(err))
    );
};

export default GoldRoutes;