import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import * as express from 'express';
import {join} from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import {ApiRouter} from './server-api/';

const PORT = process.env.PORT || 4400;

const app = express();

app.use(bodyParser.json({limit: '5mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

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
