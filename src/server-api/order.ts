import * as express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { createGUID } from './common/index';
import { join } from 'path';

import { User } from './user';
import { Organization } from './organization';
import { Sit } from './sit';
import { IUser } from '../app/defines/IUser';
import { ISit } from '../app/defines/ISit';
import { IOrg } from '../app/defines/IOrg';
const filePath = join(__dirname, './data/orders.db.json');

export class Order {
  orderID: string = createGUID();
  orgID: string;
  userID: string;
  user: IUser;
  sitID: string;
  sit: ISit;
  org: IOrg;
  orderDate: Date;
  createdAt: Date;
  releaseDate: string = null;

  constructor(data) {
    Object.assign(this, data);
    this.user = User.getUser(this.userID);
    this.sit = Sit.getSit(this.sitID);
    this.org = Organization.getOrg(this.orgID);
  }

  static getAllOrders() {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static getOrdersByOrg(loggedOrgID: string): Order[] {
    return Order.getAllOrders().filter(order => order.orgID === loggedOrgID)
      .map(data => new Order(data));
  }

  static saveAllOrders(ordersList) {
    writeFileSync(filePath, JSON.stringify(ordersList, null, 2));
  }

  static createOrder(data) {
    const order = new Order(data);
    const orders = this.getAllOrders();
    orders.unshift(Order.clearData(order));
    this.saveAllOrders(orders);
    return order;
  }

  static finishOrder(orderID: string) {
    const currentOrder = this.getOrder(orderID);
    currentOrder.releaseDate = new Date();
    const sit = Sit.getSit(currentOrder.sitID);
    sit.reserved = false;
    sit.paid = false;
    Sit.updateSit(sit);
    this.updateOrder(currentOrder);
    return currentOrder;
  }

  static clearData(order) {
    delete order.sit;
    delete order.user;
    delete order.org;
    return order;
  }

  static updateOrder(data) {
    const order = new Order(data);
    const orders = this.getAllOrders();
    const index = orders.findIndex((order) => order.orderID === data.orderID);
    orders.splice(index, 1, Order.clearData(order));
    this.saveAllOrders(orders);
    return order;
  }

  static getOrder(orderID) {
    return Order.getAllOrders().find(o => o.orderID === orderID);
  }

  static getAllOrdersInfo(userID: string) {
   return  Order.getAllOrders()
      .filter(order => order.userID === userID)
       .map (data => new Order(data));
  }
 }

export const OrderRouter = express.Router();

OrderRouter.get('/order-list', (req, res) => {
     res.json(Order.getAllOrdersInfo(req.loggedInUser.userID));
});

OrderRouter.use(function (req, res, next) {
  const sessionKey = req.cookies.sessionUserKey;
  const {userID} = User.getUserBySessionKey(sessionKey) || {userID: null};
  if (!userID) {
    res.cookie('sessionKey', '');
    return res.sendStatus(404);
  }
  req.userID = userID;
  next();
});

// create order
OrderRouter.post('/', (req, res) => {
  res.json(Order.createOrder(req.loggedInUser.userID));
});






