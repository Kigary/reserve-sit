import * as express from 'express';
import {UserRouter} from './user';
import {SitRouter} from './sit';

export const ApiRouter = express.Router();

ApiRouter.use('/users', UserRouter);
ApiRouter.use('/sit', SitRouter);
