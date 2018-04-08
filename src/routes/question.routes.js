import Question from '../models/question.model';
import { JwtAuth } from '../middlewares';

let QuestionRoutes = (app, router) => {

  router.route('/questions')

    /*
      POST api/questions { question }
    */
    .post(JwtAuth(app), (req, res) => {
      let question = new Question();
      question.title = req.body.title;
      question.content = req.body.content;
      question.user = req.body.userId;
      question.course = req.body.courseId;

      question.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/questions/course/:courseId')

    /*
      GET api/questions
    */
    .get(JwtAuth(app), (req, res) =>
      Question.find({ course: req.params.courseId })
        .populate('user')
        .sort({ 'created': 'desc' })
        .then(questions => res.json(questions))
        .catch(err => res.status(404).send(err))
    );


  router.route('/questions/:id')

    /*
      GET /api/questions/id
    */
    .get(JwtAuth(app), (req, res) =>
      Question.findById(req.params.id)
        .populate('user')
        .then(question => res.json(question))
        .catch(err => res.status(404).send(err))
    )

    /*
      PUT /api/questions/id { question }
    */
    .put(JwtAuth(app), (req, res) => {
      Question.findById(req.params.id)
        .then(question => {
          question.title = req.body.title || question.title;
          question.content = req.body.content || question.content;
          return question;
        })
        .then(question => question.save())
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      DELETE /api/questions/id
    */
    .delete(JwtAuth(app), (req, res) =>
      Question.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(404).send(err))
    );
};

export default QuestionRoutes;