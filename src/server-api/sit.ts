import * as express from 'express';
import { join } from 'path';
import { createGUID } from './common/index';
import { readFileSync, writeFileSync } from 'fs';

import { Organization } from './organization';
import { Order } from './order';
import { IOrg } from './defines/IOrg';


const filePath = join(__dirname, './data/sits.db.json');

export class Sit {
  sitID: string = createGUID();
  orgID: string;
  name: string;
  numOfSeats: number;
  reserved: boolean;
  cost: number;
  paid: boolean;
  image: string;
  org: IOrg;

  constructor(data) {
    Object.assign(this, data);
    this.org = {} as IOrg;
  }

  static getSit(id: string): Sit {
    return this.getSits().find(s => s.sitID === id);
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

  static getSitsByOrg(loggedOrgID: string, search: string): Sit[] {
    return this.getSits().filter(sit => sit.orgID === loggedOrgID
        && sit.name.toLowerCase().includes(search.toLowerCase()));
  }

  static createSit(data, loggedInOrg): Sit {
    data.orgID = loggedInOrg.orgID;
    data.reserved = false;
    data.paid = false;
    const sit = new Sit(data);
    sit.org.name = loggedInOrg.name;
    const sits = this.getSits();
    sits.unshift(sit);
    this.saveAllSits(sits);
    return sit;
  }

  static updateSit(data): Sit {
    const sits = this.getSits();
    const index = sits.findIndex(s => s.sitID === data.sitID);
    sits.splice(index, 1, data);
    this.saveAllSits(sits);
    return data;
  }

  static deleteSit(id: string) {
    const sits = this.getSits().filter(s => s.sitID !== id);
    this.saveAllSits(sits);
  }

  static reserveSit(sitID: string, userID: string, reserveDate: string): Sit {
    const sits = this.getSits();
    const currentSit = sits.find(s => s.sitID === sitID);
    currentSit.reserved = true;
    const index = sits.findIndex(s => s.sitID === sitID);
    sits.splice(index, 1, currentSit);
    this.saveAllSits(sits);
    const order = {
      orgID: currentSit.orgID,
      userID: userID,
      sitID: sitID,
      orderDate: new Date(reserveDate),
      createdAt: new Date()
    };
    Order.createOrder(order);
    return currentSit;
  }

  static applySearch(filterData): Sit[] {
    let sits = Sit.getSits();
    if(!Object.keys(filterData).length) {
      return sits;
    }
    if (filterData.orgID && filterData.orgID !== 'allID' ) {
        sits = sits.filter(sit => sit.orgID === filterData.orgID);
    }
    if (filterData.sits) {
        sits = sits.filter(sit => sit.numOfSeats >= +filterData.sits);
    }
    if (filterData.minPrice) {
      sits = sits.filter(sit => +filterData.minPrice <= sit.cost);
    }
    if (filterData.maxPrice) {
      sits = sits.filter(sit => +filterData.maxPrice >= sit.cost);
    }
    return sits;
  }

  static saveAllSits(sitList: Sit[]) {
    writeFileSync(filePath, JSON.stringify(sitList, null, 2));
  }
}

export const SitRouter = express.Router();

SitRouter.get('/sit-list', (req, res) => {
  res.json(Sit.getAllSits());
});      // sit list for user

SitRouter.get('/sit-list-org', (req, res) => {
  res.json(Sit.getSitsByOrg(req.loggedInOrg.orgID, req.query.search));
});  // sit list for organization

SitRouter.get('/sit-filter', (req, res) => {
   res.json(Sit.applySearch(req.query));
});    // sit list filter

SitRouter.post('/', (req, res) => {
  const sit = Sit.createSit(req.body, req.loggedInOrg);
  res.status(200).send(sit);
});             // create sit

SitRouter.post('/update/', (req, res) => {
  res.json(Sit.updateSit(req.body));
});      // update sit

SitRouter.get('/reserve/:id', (req, res) => {
  const sitID = req.params.id;
  const userID = req.loggedInUser.userID;
  const reserveDate = req.query.reserve;
  res.json(Sit.reserveSit(sitID, userID, reserveDate));
});   // reserve sit

SitRouter.delete('/:id', (req, res) => {
  Sit.deleteSit(req.params.id);
  res.status(200).end();
});        // delete sit
