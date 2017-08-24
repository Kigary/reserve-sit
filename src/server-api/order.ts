import * as express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { createGUID } from './common/index';
import { join } from 'path';

import { Sit } from './sit';
import { User } from './user';
import { IUser } from '../app/defines/IUser';
import { Organization } from './organization';
import { IPagingData } from '../app/defines/IPagingData';


interface IOrderSearchCriteria {
  search: string;
  size: number;
  index: number;
}

const filePath = join(__dirname, './data/orders.db.json');

export class Order {
  orderID: string = createGUID();
  orgID: string;
  org: Organization;
  userID: string;
  user: IUser;
  sitID: string;
  sit: Sit;
  orderDate: Date;
  createdAt: Date;
  releaseDate: Date|null = null;

  constructor(data) {
    Object.assign(this, data);
    this.user = User.getUser(this.userID);
    this.sit = Sit.getSit(this.sitID);
    this.org = Organization.getOrg(this.orgID);
  }

  static getOrder(orderID): Order {
    return Order.getAllOrders().find(o => o.orderID === orderID);
  }

  static getAllOrders(): Order[] {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static getOrdersByOrg(loggedOrgID: string): Order[] {
    return Order.getAllOrders()
      .filter(order => order.orgID === loggedOrgID)
      .map(data => new Order(data));
  }

  static getOrgReservations(loggedOrgID: string, search: string): Order[] {
    return Order.getOrdersByOrg(loggedOrgID)
      .filter(order => order.releaseDate === null
        && order.sit.name.toLowerCase().includes(search.toLowerCase()));
  }

  static getOrgArchive(loggedOrgID: string, criteria: IOrderSearchCriteria) {
    const filteredOrders = Order.getOrdersByOrg(loggedOrgID)
      .filter(order => order.releaseDate !== null
        && order.sit.name.toLowerCase().includes(criteria.search.toLowerCase())
    );

    const result = {
      totalCount: filteredOrders.length
    } as IPagingData<Order>;

    criteria.size = +criteria.size;

    const offset = criteria.index * criteria.size || 0;
    result.data = filteredOrders.slice(offset, offset + criteria.size);

    return result;
  }

  static getOrdersByUser(loggedUserID: string): Order[] {
    return  Order.getAllOrders()
      .filter(order => order.userID === loggedUserID)
      .map (data => new Order(data));
  }

  static createOrder(data): Order {
    const order = new Order(data);
    const orders = this.getAllOrders();
    orders.unshift(Order.clearData(order));
    this.saveAllOrders(orders);
    return order;
  }

  static finishOrder(orderID: string): Order {
    const currentOrder = this.getOrder(orderID);
    const currentSit = Sit.getSit(currentOrder.sitID);
    currentOrder.releaseDate = new Date;
    currentSit.reserved = false;
    currentSit.paid = false;
    Sit.updateSit(currentSit);
    this.updateOrder(currentOrder);
    return currentOrder;
  }

  static updateOrder(data): Order {
    const order = new Order(data);
    const orders = this.getAllOrders();
    const index = orders.findIndex(order => order.orderID === data.orderID);
    orders.splice(index, 1, Order.clearData(order));
    this.saveAllOrders(orders);
    return order;
  }

  static clearData(order): Order {
    delete order.org;
    delete order.user;
    delete order.sit;
    return order;
  }

  static saveAllOrders(orderList) {
    writeFileSync(filePath, JSON.stringify(orderList, null, 2));
  }
}

export const OrderRouter = express.Router();

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

OrderRouter.get('/order-list', (req, res) => {
     res.json(Order.getOrdersByUser(req.loggedInUser.userID));
});
