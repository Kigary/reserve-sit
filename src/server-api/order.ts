import * as express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { createGUID } from './common/index';
import { join } from 'path';

import { User } from './user';
import { Organization } from './organization';
import { Sit } from './sit';
import { IUser } from '../app/defines/IUser';
import { ISit } from '../app/defines/ISit';

const filePath = join(__dirname, './data/orders.db.json');

export class Order {
  orderID: string = createGUID();
  orgID: string;
  userID: string;
  user: IUser;
  sitID: string;
  sit: ISit;
  orderDate: Date;
  createdAt: Date;
  releaseDate: string = null;

  constructor(data) {
    Object.assign(this, data);
    this.user = User.getUser(this.userID);
    this.sit = Sit.getSit(this.sitID);
  }

  static getAllOrders() {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static getOrder(orderID) {
    return Order.getAllOrders().find(o => o.orderID === orderID);
  }

  static getOrdersByOrg(loggedOrgID: string): Order[]{
    return Order.getAllOrders().filter(order => order.orgID === loggedOrgID)
      .map(data => new Order(data));
  }

  static getActiveOrders(loggedOrgID: string): Order[] {
    return Order.getOrdersByOrg(loggedOrgID).filter(order => order.releaseDate === 'null');
  }

  static getArchivedOrders(loggedOrgID: string): Order[] {
    return Order.getOrdersByOrg(loggedOrgID).filter(order => order.releaseDate !== 'null');
  }

  static getAllOrdersInfo(userID: string) {
    const order = Order.getAllOrdersUser(userID);
    order.forEach((order) => {
      order.orgID = Organization.getOrg(order.orgID);
      order.sitID = Sit.getSit(order.sitID);
    });
    return order;
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

  static deleteOrder(orderID) {
    const orders = this.getAllOrders();
    const index = orders.findIndex((order) => order.orderID === orderID);
    orders.splice(index, 1);
    this.saveAllOrders(orders);
  }

  static clearData(order) {
    delete order.sit;
    delete order.user;
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

  static getAllOrdersUser(userID: string) {
    return Order.getAllOrders().filter(order => order.userID === userID);
  }
}

export const OrderRouter = express.Router();

OrderRouter.use(function (req, res, next) {
  const sessionKey = 'bb4b2bd5-ff26-ab6f-37dc-0b6d778a75fe'; //req.cookies.sessionKey;
  const {userID} = User.getUserBySessionKey(sessionKey) || {userID: null};
  if (!userID) {
    res.cookie('sessionKey', '');
    return res.sendStatus(404);
  }
  req.userID = userID;
  next();
});

OrderRouter.get('/order-list', (req, res) => {
  res.json(Order.getAllOrdersInfo(req.userID));
});

// OrderRouter.get('/orders', (req, res) => {
//   res.json(Order.getOrdersByOrg(req.loggedInOrg.orgID));
// });

// create order
OrderRouter.post('/', (req, res) => {
  res.json(Order.createOrder(req.userID));
});

// finish order
OrderRouter.get(`/release/:orderId`, (req, res) => {

});

// update order
OrderRouter.post('/:orderId', (req, res) => {
  const data = req.body;
  data.orderId = req.prams.orderId;
  res.json(Order.updateOrder(data));
});
