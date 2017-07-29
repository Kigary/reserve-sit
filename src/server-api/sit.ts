import * as express from 'express';
import {readFileSync, writeFileSync} from 'fs';
import {createGUID} from './common/index';
import {join} from 'path';

const filePath = join(__dirname, './data/sit.db.json');

class Sit {
  id: string = createGUID();
  seat: number;
  organization: string;
  // free: boolean;

  static getAllSit(): Sit[] {
    return JSON.parse(readFileSync(filePath).toString());
  }
  static getSit(id: string): Sit {
    return this.getAllSit().find(u => u.id === id);
  }
}

export const SitRouter = express.Router();

SitRouter.get('/sit-list', (req, res) => {
  res.json(Sit.getAllSit());
});

SitRouter.get('/:id', (req, res) => {
  res.json(Sit.getSit(req.params.id));
});
