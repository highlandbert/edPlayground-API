import Platinum from '../models/platinum.model';
import Question from '../models/question.model';
import { JwtAuth } from '../middlewares';

let PlatinumRoutes = (app, router) => {

  router.route('/platinums')

    /*
      POST api/platinums { platinum }
    */
    .post(JwtAuth(app), (req, res) => {
      let platinum = new Platinum();
      platinum.user = req.body.userId;
      platinum.question = req.body.questionId;

      Question.findById(platinum.question)
        .then(question => {
          platinum.creator = question.user;
          return platinum.save();
        })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/platinums/question/:questionId')

    /*
      GET /api/platinums/question/questionId
    */
    .get(JwtAuth(app), (req, res) =>
      Platinum.find({ question: req.params.questionId })
        .then(platinum => res.json(platinum))
        .catch(err => res.status(404).send(err))
    );

    router.route('/platinums/creator/:userId')

      /*
        GET /api/platinums/creator/userId
      */
      .get(JwtAuth(app), (req, res) =>
        Platinum.find({ creator: req.params.userId })
          .then(platinum => res.json(platinum))
          .catch(err => res.status(404).send(err))
      );

  router.route('/platinums/:id')

    /*
      DELETE /api/platinums/id
    */
    .delete(JwtAuth(app), (req, res) =>
      Platinum.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(404).send(err))
    );
};

export default PlatinumRoutes;