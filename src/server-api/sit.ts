import * as express from 'express';
import { createGUID } from './common/index';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

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

  constructor(data) {
    Object.assign(this, data);
  }

  static getSits() {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static getAllSits(): Sit[] {
    const sits = this.getSits();
    return sits.map(sit => sit);
  }

  static getAllSitsByOrg(loggedOrgID): Sit[] {
    const sits = this.getSits();
    return sits.filter(sit => sit.orgID === loggedOrgID);
  }

  static getSit(id: string): Sit {
    return this.getSits().find(s => s.sitID === id);
  }

  static createSit(data, loggedOrgID) {
    data.parentOrgID = null;
    data.orgID = loggedOrgID;
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

  static reserveSit(id) {
    const sits = this.getAllSits();
    const currentSit = sits.find(s => s.sitID === id);
    currentSit.reserved = !currentSit.reserved;
    const sitIndex = sits.findIndex(s => s.sitID === id);
    sits.splice(sitIndex, 1, currentSit);
    this.saveAllSits(sits);
    return currentSit;
  }

  static applySearch(filterData) {
    let sits = Sit.getAllSits();
    if(!Object.keys(filterData).length) {
      return sits;
    }
    if (filterData.orgID) {
        sits = sits.filter((sit) => sit.orgID === filterData.orgID);
    }
    if (filterData.sits) {
        sits = sits.filter((sit) => sit.numOfSeats >= +filterData.sits);
    }
    if (filterData.minPrice) {
      sits = sits.filter((sit) => +filterData.minPrice <= sit.cost);
    }
    if (filterData.maxPrice) {
      sits = sits.filter((sit) => +filterData.maxPrice >= sit.cost);
    }
    return sits;
  }
}

export const SitRouter = express.Router();

SitRouter.get('/sit-list', (req, res) => {
  res.json(Sit.getAllSits());
});
SitRouter.get('/sit-filter', (req, res) => {
   res.json(Sit.applySearch(req.query));
});

SitRouter.get('/sit-list-org', (req, res) => {
  res.json(Sit.getAllSitsByOrg(req.loggedInOrg.orgID));
});

SitRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.json(Sit.reserveSit(id));
});

SitRouter.post('/', (req, res) => {
  console.log(req.body);
  const sit = Sit.createSit(req.body, req.loggedInOrg.orgID);
  res.status(200).send(sit);
});

SitRouter.delete('/:id', (req, res) => {
  Sit.deleteSit(req.params.id);
  res.status(200).end();
});

SitRouter.post('/:id', (req, res) => {
  console.log(req.body);
  const data = req.body;
  data.sitID = req.params.id;
  res.json(Sit.updateSit(data));
});
