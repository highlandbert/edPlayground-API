import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRoutes from './routes/user.routes';

const MONGO_USER = 'roberto';
const MONGO_PASS = 'isaacberry';
const MONGO_ROUTE = 'ds151348.mlab.com:51348/edplayground';
const MONGO_URL = `mongodb://${ MONGO_USER }:${ MONGO_PASS }@${ MONGO_ROUTE }`;
mongoose.connect(MONGO_URL).then(() => console.log('Connected to Database: ' + MONGO_ROUTE));
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let router = express.Router();
router.get('/', (req, res) => res.status(200).send('Api Running...'));

UserRoutes(router);

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port: ' + port);
