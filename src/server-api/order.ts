import * as express from 'express';
import {readFileSync, writeFileSync} from 'fs';
import {createGUID} from './common/index';
import {join} from 'path';

const filePath = join(__dirname, './data/sit.db.json');

class Order {
  orderId: string = createGUID();
  userId: string;
  sitId: string;
  orderDate: Date;
  createdAt: Date;
  lastModifiedAt: Date;

  static getAllOrders(): Order[] {
    return JSON.parse(readFileSync(filePath).toString());
  }
  static getOrder(id: string): Order {
    return this.getAllOrders().find(o => o.orderId === id);
  }
}

export const OrderRouter = express.Router();

OrderRouter.get('/order-list', (req, res) => {
  res.json(Order.getAllOrders());
});

OrderRouter.get('/:id', (req, res) => {
  res.json(Order.getOrder(req.params.id));
});
