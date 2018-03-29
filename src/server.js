import express from 'express';
import bodyParser from 'body-parser';
import expressSanitizer from 'express-sanitizer';
import morgan from 'morgan';
import mongoose from 'mongoose';
import Config from './config';
import UserRoutes from './routes/user.routes';
import CourseRoutes from './routes/course.routes';
import EnrollmentRoutes from './routes/enrollment.routes';
import AuthRoutes from './routes/auth.routes';
import LessonRoutes from './routes/lesson.routes';
import LevelRoutes from './routes/level.routes';
import SupplementRoutes from './routes/supplement.routes';
import LevelResultsRoutes from './routes/level-results.routes';

const dbconnection = `mongodb://${ Config.database.user }:${ Config.database.password }@${ Config.database.url }`;
mongoose.Promise = Promise;
mongoose.connect(dbconnection)
  .then(() => console.log('Connected to Database: ' + Config.database.url ));

const port = process.env.PORT || 8080;

let app = express();
app.set('secret', Config.secret);
app.set('authenticate', false);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(morgan('dev'));

let router = express.Router();
router.get('/', (req, res) => res.status(200).send('Api Running...'));

UserRoutes(app, router);
CourseRoutes(app, router);
EnrollmentRoutes(app, router);
LessonRoutes(app, router);
LevelRoutes(app, router);
SupplementRoutes(app, router);
LevelResultsRoutes(app, router);
AuthRoutes(app, router);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, x-access-token, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port: ' + port);
