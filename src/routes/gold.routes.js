import Gold from '../models/gold.model';
import Answer from '../models/answer.model';
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

      Answer.findById(gold.answer)
        .then(answer => {
          gold.creator = answer.user;
          return gold.save();
        })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/golds/answer/:answerId')

    /*
      GET /api/golds/answer/answerId
    */
    .get(JwtAuth(app), (req, res) =>
      Gold.find({ answer: req.params.answerId })
        .then(gold => res.json(gold))
        .catch(err => res.status(404).send(err))
    );

    router.route('/golds/creator/:userId')

      /*
        GET /api/golds/creator/userId
      */
      .get(JwtAuth(app), (req, res) =>
        Gold.find({ creator: req.params.userId })
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