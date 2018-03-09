import Supplement from '../models/supplement.model';
import { JwtAuth } from '../middlewares';

let SupplementRoutes = (app, router) => {

  router.route('/supplements')

    /*
      POST api/supplements { supplement }
    */
    .post(JwtAuth(app), (req, res) => {
      let supplement = new Supplement();
      supplement.name = req.body.name;
      supplement.order = req.body.order;
      supplement.content = req.sanitize(req.body.content);
      supplement.lesson = req.body.lessonId;

      supplement.save()
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    });

  router.route('/supplements/:id')

    /*
      GET /api/supplements/lessonId
    */
    .get(JwtAuth(app), (req, res) =>
      Supplement.find({ lesson: req.params.id })
        .then(supplement => res.json(supplement))
        .catch(err => res.status(404).send(err))
    )

    /*
      PUT /api/supplements/id { supplement }
    */
    .put(JwtAuth(app), (req, res) => {
      Supplement.findById(req.params.id)
        .then(supplement => {
          supplement.name = req.body.name || supplement.name;
          supplement.order = req.body.order || supplement.order;
          supplement.content = req.body.content 
            && req.sanitize(req.body.content) || supplement.content;
          return supplement;
        })
        .then(supplement => supplement.save())
        .then(() => res.json({ done: true }))
        .catch(err => res.status(400).send(err));
    })

    /*
      DELETE /api/supplements/id
    */
    .delete(JwtAuth(app), (req, res) =>
      Supplement.remove({ _id: req.params.id })
        .then(() => res.json({ done: true }))
        .catch(err => res.status(404).send(err))
    );
};

export default SupplementRoutes;