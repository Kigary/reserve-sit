import * as express from 'express';
import {readFileSync, writeFileSync} from 'fs';
import {createGUID} from './common/index';

import {join} from 'path';
import {User} from './user';
import {Organization} from './organization';
import {Sit} from './sit';

const filePath = join(__dirname, './data/orders.db.json');

class Order {
  orderID: string = createGUID();
  userId: string;
  sitID: string;
  orgID: string;
  orderDate: Date;
  expireDate: Date;
  createdAt: Date;
  lastModifiedAt: Date;

  constructor(data) {
    Object.assign(this, data);
  }

  static getAllOrders() {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static saveAllOrders(ordersList) {
    writeFileSync(filePath, JSON.stringify(ordersList, null, 2));
  }

  static createOrder(data) {
    const order = new Order(data);
    const orders = this.getAllOrders();
    orders.push(order);
    this.saveAllOrders(orders);
    return order;
  }

  static deleteOrder(orderId) {
    const orders = this.getAllOrders();
    const index = orders.findIndex((order) => order.orderId === orderId);
    orders.splice(index, 1);
    this.saveAllOrders(orders);
  }

  static updateOrder(data) {
    const order = new Order(data);
    const orders = this.getAllOrders();
    const index = orders.findIndex((order) => order.orderId === data.orderId);
    orders.splice(index, 1, order);
    this.saveAllOrders(orders);
    return order;
  }

  static getOrder(orderId) {
    return Order.getAllOrders().find(o => o.orderId === orderId);
  }

  static getAllOrdersInfo(userID: string) {
    const order = Order.getAllOrdersUser(userID);
    order.forEach((order) => {
      order.orgID = Organization.getOrg(order.orgID);
      order.sitID = Sit.getSit(order.sitID);
    });
    console.log(order);
    return order;
  }

  static getAllOrdersUser(userID: string) {
    return Order.getAllOrders().filter((ord) => ord.userID === userID);
  }
}

export const OrderRouter = express.Router();

OrderRouter.use(function (req, res, next) {
  const sessionKey = 'd577060d-0633-ae78-aba3-32d675540e9b';
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

// create order
OrderRouter.post('/', (req, res) => {
  res.json(Order.createOrder(req.userID));
});

// update order
OrderRouter.post('/:orderId', (req, res) => {
  const data = req.body;
  data.orderId = req.prams.orderId;
  res.json(Order.updateOrder(data));
});





