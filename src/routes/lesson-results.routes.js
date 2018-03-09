import LessonResults from '../models/lesson-results.model';
import { JwtAuth } from '../middlewares';

let LessonResultsRoutes = (app, router) => {

  router.route('/lessonsResults')

    /*
      POST api/lessonsResults { lessonResults }
    */
    .post(JwtAuth(app), (req, res) => {
      let lessonResults = new LessonResults();
      lessonResults.results = req.body.results;
      lessonResults.lesson = req.body.lessonId;

      lessonResults.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/lessonsResults/:id')

    /*
      GET /api/lessonsResults/lessonId
    */
    .get(JwtAuth(app), (req, res) =>
      LessonResults.find({ lesson: req.params.id })
        .then(lessonResults => res.json(lessonResults))
        .catch(err => res.status(404).send(err))
    )

    /*
      PUT /api/lessonsResults/id { lessonResults }
    */
    .put(JwtAuth(app), (req, res) => {
      LessonResults.findById(req.params.id)
        .then(lessonResults => {
          lessonResults.results = req.body.results || lessonResults.results;
          return lessonResults;
        })
        .then(lessonResults => lessonResults.save())
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      DELETE /api/lessonsResults/id
    */
    .delete(JwtAuth(app), (req, res) =>
      LessonResults.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(404).send(err))
    );
};

export default LessonResultsRoutes;