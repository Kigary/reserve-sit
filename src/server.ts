import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import * as express from 'express';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { ApiRouter } from './server-api/';
import { Organization } from './server-api/organization';
import { User } from './server-api/user';


const PORT = process.env.PORT || 4400;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({limit: '500kb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
  const sessionKey = req.cookies.sessionKey;
  const sessionUserKey = req.cookies.sessionUserKey;
  const loggedInOrg = sessionKey && Organization.getOrgBySessionKey(sessionKey);
  const loggedInUser = sessionUserKey && User.getUserBySessionKey(sessionUserKey);
  req.loggedInOrg = loggedInOrg;
  req.loggedInUser = loggedInUser;
  loggedInOrg || res.cookie('sessionKey', '');
  loggedInUser || res.cookie('sessionUserKey', '');

  next();
});

const dist = join(__dirname, '..', 'dist');
const indexPath = join(dist, 'index.html');

app.use(express.static(dist));
app.use('/api', ApiRouter);

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
