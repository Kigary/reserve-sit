import * as express from 'express';
import {UserRouter} from './user';
import {SitRouter} from './sit';
import {OrderRouter} from './order';
import {OrgRouter} from './organization';


export const ApiRouter = express.Router();

ApiRouter.use('/user', UserRouter);
ApiRouter.use('/order', OrderRouter);
ApiRouter.use('/organization', OrgRouter);
ApiRouter.use('/sit', SitRouter);
