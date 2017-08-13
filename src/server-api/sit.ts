import * as express from 'express';
import { createGUID } from './common/index';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Organization } from './organization';

const filePath = join(__dirname, './data/sits.db.json');

export class Sit {
  sitID: string = createGUID();
  orgID: string;
  sitName: string;
  numOfSeats: number;
  reserved: boolean;
  cost: number;
  paid: boolean;
  image: string;
  parentOrgID?: string;

  constructor(data) {
    Object.assign(this, data);
  }

  static getSits() {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static getAllSits(): Sit[] {
    const sits = this.getSits();
    return sits.filter(sit => sit.orgID === Organization.loggedInOrg.orgID);
  }

  static getSit(id: string): Sit {
    return this.getSits().find(s => s.sitID === id);
  }

  static createSit(data) {
    data.parentOrgID = null;
    data.orgID = Organization.loggedInOrg.orgID;
    const sit = new Sit(data);
    const sits = this.getSits();
    sits.unshift(sit);
    this.saveAllSits(sits);
    return sit;
  }

  static saveAllSits(sitList) {
    writeFileSync(filePath, JSON.stringify(sitList, null, 2));
  }

  static deleteSit(id) {
    const sits = this.getSits().filter(s => s.sitID !== id);
    this.saveAllSits(sits);
  }

  static updateSit(data) {
    const sits = this.getAllSits();
    const sitIndex = sits.findIndex(s => s.sitID === data.sitID);
    sits.splice(sitIndex, 1, data);
    this.saveAllSits(sits);
    return data;
  }
}

export const SitRouter = express.Router();

SitRouter.get('/sit-list', (req, res) => {
  res.json(Sit.getAllSits());
});

SitRouter.post('/', (req, res) => {
  const sit = Sit.createSit(req.body);
  res.status(200).send(sit);
});

SitRouter.delete('/:id', (req, res) => {
  Sit.deleteSit(req.params.id);
  res.status(200).end();
});

SitRouter.post('/:id', (req, res) => {
  const data = req.body;
  data.sitID = req.params.id;
  res.json(Sit.updateSit(data));
});
