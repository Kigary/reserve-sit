import * as express from 'express';
import {readFileSync, writeFileSync} from 'fs';
import {createGUID} from './common/index';
import {join} from 'path';

const filePath = join(__dirname, './data/sit.db.json');

class Sit {
  sitId: string = createGUID();
  branchId: string;
  numOfSeats: number;
  reserved: boolean;
  paid: boolean;

  static getAllSits(): Sit[] {
    return JSON.parse(readFileSync(filePath).toString());
  }
  static getSit(id: string): Sit {
    return this.getAllSits().find(s => s.sitId === id);
  }
}

export const SitRouter = express.Router();

SitRouter.get('/sit-list', (req, res) => {
  res.json(Sit.getAllSits());
});

SitRouter.get('/:id', (req, res) => {
  res.json(Sit.getSit(req.params.id));
});
