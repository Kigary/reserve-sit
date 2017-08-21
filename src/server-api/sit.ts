import * as express from 'express';
import { createGUID } from './common/index';
import { readFileSync, writeFileSync } from 'fs';
import {Organization} from './organization';
import { join } from 'path';
import {IOrg} from '../app/defines/IOrg';
import { Order } from './order';

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
  org?: IOrg;
  constructor(data) {
    Object.assign(this, data);
  }

  static getSits(): Sit[] {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static getAllSits(): Sit[] {
    const sits = this.getSits();
    return sits.map(sit => {
       sit.org = Organization.getOrg(sit.orgID);
       return sit;
    });
  }

  static getAllSitsByOrg(loggedOrgID): Sit[] {
    const sits = this.getSits();
    return sits.filter(sit => sit.orgID === loggedOrgID);
  }

  static getSit(id: string): Sit {
    return this.getSits().find(s => s.sitID === id);
  }

  static createSit(data, loggedOrgID) {
    console.log(data, loggedOrgID);
    data.orgID = loggedOrgID;
    data.reserved = false;
    data.paid = false;
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
    const sits = this.getSits();
    const sitIndex = sits.findIndex(s => s.sitID === data.sitID);
    sits.splice(sitIndex, 1, data);
    this.saveAllSits(sits);
    return data;
  }

  static reserveSit(sitID, userID) {
    const sits = this.getAllSits();
    const currentSit = sits.find(s => s.sitID === sitID);
    currentSit.reserved = !currentSit.reserved;
    const sitIndex = sits.findIndex(s => s.sitID === sitID);
    sits.splice(sitIndex, 1, currentSit);
    this.saveAllSits(sits);
    const order = {
      orgID: currentSit.orgID,
      userID: userID,
      sitID: sitID,
      orderDate: new Date,
      createdAt: new Date
    };
    Order.createOrder(order);
    return currentSit;
  }

  static applySearch(filterData) {
    let sits = Sit.getAllSits();
    if(!Object.keys(filterData).length) {
      return sits;
    }
    if (filterData.orgID !== 'allID' && filterData.orgID) {
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
  const sitID = req.params.id;
  const userID = req.loggedInUser.userID;
  res.json(Sit.reserveSit(sitID, userID));
});

SitRouter.post('/', (req, res) => {
  const sit = Sit.createSit(req.body, req.loggedInOrg.orgID);
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
