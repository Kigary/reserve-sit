import * as express from 'express';
import {UserRouter} from './user';
import {SitRouter} from './sit';
import {OrderRouter} from './order';
import {OrgRouter} from './organization';
import {CountryRouter} from './country';

export const ApiRouter = express.Router();

ApiRouter.use('/user', UserRouter);
ApiRouter.use('/order', OrderRouter);
ApiRouter.use('/org', OrgRouter);
ApiRouter.use('/sit', SitRouter);
ApiRouter.use('/country', CountryRouter);
