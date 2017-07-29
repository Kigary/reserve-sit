import * as express from 'express';
import {UserRouter} from './user';
import {SitRouter} from './sit';
import {OrderRouter} from './order';
import {OrganizationRouter} from './organization';
import {BranchRouter} from './branch';


export const ApiRouter = express.Router();

ApiRouter.use('/user', UserRouter);
ApiRouter.use('/order', OrderRouter);
ApiRouter.use('/organization', OrganizationRouter);
ApiRouter.use('/branch', BranchRouter);
ApiRouter.use('/sit', SitRouter);
