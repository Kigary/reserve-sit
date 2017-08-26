import * as express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { createGUID } from './common/index';
import { LoginData } from './defines/loginData';
import { Order } from './order';


const filePath = join(__dirname, './data/orgs.db.json');

export class Organization {
  orgID: string = createGUID();
  name: string;
  login: string;
  password: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  fax?: string;
  email?: string;
  sessionKeys: string[] = [];

  constructor(data) {
    Object.assign(this, data);
  }

  static getOrg(id: string): Organization {
    return this.getOrgsSafe().find(o => o.orgID === id);
  }

  static getOrgBySessionKey(sessionKey: string): Organization|null {
    if (!sessionKey) {
      return null;
    }
    const orgData = this.getOrgs()
      .find(org => org.sessionKeys.includes(sessionKey));
    return Organization.dataToOrg(orgData);
  }

  static getOrgs(): Organization[] {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static getOrgsSafe(): Organization[] {
    return this.getOrgs()
      .map(org =>
           delete org.password
        && delete org.login
        && delete org.sessionKeys
        && org);
  }

  static createOrg(data) {
    const org = new Organization(data);
    const orgs = this.getOrgs();
    orgs.push(org);
    this.saveAllOrgs(orgs);
  }

  static updateOrg(data): Organization {
    const orgs = this.getOrgs();
    const index = orgs.findIndex(o => o.orgID === data.orgID);
    orgs.splice(index, 1, data);
    this.saveAllOrgs(orgs);
    return data;
  }

  static saveAllOrgs(orgList) {
    writeFileSync(filePath, JSON.stringify(orgList, null, 2));
  }

  static login(data: LoginData): Organization|null {
    const orgData = this.getOrgs()
      .find((org) => {
      return org.login === data.login
          && org.password === data.password;
    });
    return Organization.dataToOrg(orgData);
  }

  static doesExistOrgLogin({login}): Boolean {
    return !!this.getOrgs()
      .find(org => org.login === login);
  }

  static doesExistOrgName ({name}): Boolean {
    return !!this.getOrgs()
      .find(org => org.name === name);
  }

  static dataToOrg(data): Organization|null {
    return data && new Organization(data);
  }

  static getOrgNames() {
    return this.getOrgs().map(org => {
      return {
        orgID: org.orgID,
        name: org.name
      };
    });
  }

  addSessionKey(sessionKey) {
    this.sessionKeys.push(sessionKey);
    Organization.updateOrg(this);
  }

  removeSessionKey(sessionKey) {
    const {sessionKeys} = this;
    const index = sessionKeys.indexOf(sessionKey);
    sessionKeys.splice(index, 1);
    Organization.updateOrg(this);
  }
}

export const OrgRouter = express.Router();

// organization log in
OrgRouter.post('/login', (req, res) => {
  const org = Organization.login(req.body);
  if (!org) {
    res.cookie('sessionKey', '');
    return res.status(404)
      .send({error: 'Username or password is incorrect'});
  }
  const sessionKey = createGUID();
  res.cookie('sessionKey', sessionKey, {maxAge: new Date(2024, 0, 1), httpOnly: false});
  org.addSessionKey(sessionKey);
  res.status(200).send({success: 'ok'});
});

// organization logged-in status
OrgRouter.get('/is-logged-in', (req, res) => {
  res.json(!!req.loggedInOrg);
});

// logged-in organization info
OrgRouter.get('/logged-org', (req, res) => {
  res.json(req.loggedInOrg);
});

// organization log out
OrgRouter.get('/logout', (req, res) => {
  const {sessionKey} = req.cookies;
  const loggedInOrg = req.loggedInOrg;
  loggedInOrg && loggedInOrg.removeSessionKey(sessionKey);
  res.cookie('sessionKey', '');
  return res.status(200).end();
});

// all organization names for user (filter search)
OrgRouter.get('/org-names', (req, res) => {
  const orgNames = Organization.getOrgNames();
  orgNames.unshift({name: 'All', orgID: 'allID'});
  res.json(orgNames);
});

// reserved seats' orders of organization
OrgRouter.get('/reserved', (req, res) => {
  res.json(Order.getOrgReservations(req.loggedInOrg.orgID, req.query.search));
});

// archived orders of organization (finished)
OrgRouter.get('/archive', (req, res) => {
  res.json(Order.getOrgArchive(req.loggedInOrg.orgID, req.query));
});

// archive order & release reserved seat
OrgRouter.get('/finish/:orderID', (req, res) => {
  res.json(Order.finishOrder(req.params.orderID));
});

// create organization
OrgRouter.post('/', (req, res) => {
  if (Organization.doesExistOrgLogin(req.body)) {
    return res.status(404).send({message: 'Pick another login'});
  }
  if (Organization.doesExistOrgName(req.body)) {
    return res.status(404).send({message: 'Name is registered'});
  }
  Organization.createOrg(req.body);
  res.status(200).end();
});
