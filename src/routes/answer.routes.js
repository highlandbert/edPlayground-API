import Answer from '../models/answer.model';
import { JwtAuth } from '../middlewares';

let AnswerRoutes = (app, router) => {

  router.route('/answers')

    /*
      POST api/answers { answer }
    */
    .post(JwtAuth(app), (req, res) => {
      let answer = new Answer();
      answer.content = req.body.content;
      answer.user = req.body.userId;
      answer.question = req.body.questionId;

      answer.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/answers/question/:questionId')

    /*
      GET /api/answers/questionId
    */
    .get(JwtAuth(app), (req, res) =>
      Answer.find({ question: req.params.questionId })
        .then(answer => res.json(answer))
        .catch(err => res.status(404).send(err))
    );

  router.route('/answers/:id')
    /*
      PUT /api/answers/id { answer }
    */
    .put(JwtAuth(app), (req, res) => {
      Answer.findById(req.params.id)
        .then(answer => {
          answer.content = req.body.content || answer.content;
          return answer;
        })
        .then(answer => answer.save())
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      DELETE /api/answers/id
    */
    .delete(JwtAuth(app), (req, res) =>
      Answer.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(404).send(err))
    );
};

export default AnswerRoutes;