import Course from '../models/course.model';
import { JwtAuth } from '../middlewares';

let CourseRoutes = (app, router) => {

  router.route('/courses')

    /*
      POST api/courses { course }
    */
    .post(JwtAuth(app), (req, res) => {
      let course = new Course();
      course.name = req.body.name;
      course.description = req.body.description;

      course.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      GET api/courses
    */
    .get(JwtAuth(app), (req, res) =>
      Course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(404).send(err))
    );


  router.route('/courses/:id')

    /*
      GET /api/courses/id
    */
    .get(JwtAuth(app), (req, res) =>
      Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(404).send(err))
    )

    /*
      PUT /api/courses/id { course }
    */
    .put(JwtAuth(app), (req, res) => {
      Course.findById(req.params.id)
        .then(course => {
          course.name = req.body.name || course.name;
          course.description = req.body.description || course.description;
          return course;
        })
        .then(course => course.save())
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      DELETE /api/courses/id
    */
    .delete(JwtAuth(app), (req, res) =>
      Course.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(404).send(err))
    );
};

export default CourseRoutes;