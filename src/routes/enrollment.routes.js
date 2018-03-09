import Enrollment from '../models/enrollment.model';
import { JwtAuth } from '../middlewares';

let EnrollmentRoutes = (app, router) => {

  router.route('/enrollments/user/:userId')

    /*
      POST api/enrollments/user/userid { courseId }
    */
    .post(JwtAuth(app), (req, res) => {
      let enrollment = new Enrollment();
      enrollment.user = req.params.userId;
      enrollment.course = req.body.courseId;

      enrollment.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      GET api/enrollments/user/userId
    */
    .get(JwtAuth(app), (req, res) =>
      Enrollment.find({ user: req.params.userId })
        .populate('course')
        .then(enrollments => res.json(enrollments))
        .catch(err => res.status(404).send(err))
    );

  router.route('/enrollments/course/:courseId')

    /*
      GET api/enrollments/course/courseId
    */
    .get(JwtAuth(app), (req, res) =>
      Enrollment.find({ course: req.params.courseId })
        .populate('user')
        .then(enrollments => res.json(enrollments))
        .catch(err => res.status(404).send(err))
    );
};

export default EnrollmentRoutes;