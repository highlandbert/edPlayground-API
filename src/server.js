import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import Config from './config';
import UserRoutes from './routes/user.routes';
import CourseRoutes from './routes/course.routes';
import EnrollmentRoutes from './routes/enrollment.routes';
import AuthRoutes from './routes/auth.routes';

const dbconnection = `mongodb://${ Config.database.user }:${ Config.database.password }@${ Config.database.url }`;
mongoose.Promise = Promise;
mongoose.connect(dbconnection)
  .then(() => console.log('Connected to Database: ' + Config.database.url ));

const port = process.env.PORT || 8080;

let app = express();
app.set('secret', Config.secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

let router = express.Router();
router.get('/', (req, res) => res.status(200).send('Api Running...'));

UserRoutes(app, router);
CourseRoutes(router);
EnrollmentRoutes(router);
AuthRoutes(app, router);

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port: ' + port);
