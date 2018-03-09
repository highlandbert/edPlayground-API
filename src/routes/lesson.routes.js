import Lesson from '../models/lesson.model';
import { JwtAuth } from '../middlewares';

let LessonRoutes = (app, router) => {

  router.route('/lessons')

    /*
      POST api/lessons { lesson }
    */
    .post(JwtAuth(app), (req, res) => {
      let lesson = new Lesson();
      lesson.name = req.body.name;
      lesson.order = req.body.order;
      lesson.course = req.body.courseId;

      lesson.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/lessons/:id')

    /*
      GET /api/lessons/courseId
    */
    .get(JwtAuth(app), (req, res) =>
      Lesson.find({ course: req.params.id })
        .then(lesson => res.json(lesson))
        .catch(err => res.status(404).send(err))
    )

    /*
      PUT /api/lessons/id { lesson }
    */
    .put(JwtAuth(app), (req, res) => {
      Lesson.findById(req.params.id)
        .then(lesson => {
          lesson.name = req.body.name || lesson.name;
          lesson.order = req.body.order || lesson.order;
          return lesson;
        })
        .then(lesson => lesson.save())
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      DELETE /api/lessons/id
    */
    .delete(JwtAuth(app), (req, res) =>
      Lesson.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(404).send(err))
    );
};

export default LessonRoutes;