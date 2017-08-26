import * as express from 'express';
import { SitRouter } from './sit';
import { UserRouter } from './user';
import { OrderRouter } from './order';
import { CountryRouter } from './country';
import { OrgRouter } from './organization';


export const ApiRouter = express.Router();

ApiRouter.use('/org', OrgRouter);
ApiRouter.use('/sit', SitRouter);
ApiRouter.use('/user', UserRouter);
ApiRouter.use('/order', OrderRouter);
ApiRouter.use('/country', CountryRouter);
