import * as express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { createGUID } from './common/index';
import { LoginData } from './defines/loginData';
import { join } from 'path';

const filePath = join(__dirname, './data/orgs.db.json');

export class Organization {
  static loggedInOrg: Organization = null;

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
  parentOrgID?: string | null;

  constructor(data) {
    Object.assign(this, data);
  }

  static getOrgs() {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static getAllOrgs(): Organization[] {
    const orgs = this.getOrgs();
    return orgs.map((org) => {
      delete org.password;
      return org;
    });
  }

  static getOrg(id: string): Organization {
    const org = this.getOrgs().find(o => o.orgID === id);
    delete org.password;
    return org;
  }

  static createOrg(data) {
    const org = new Organization(data);
    const orgs = this.getOrgs();
    orgs.push(org);
    this.saveAllOrg(orgs);
  }

  static saveAllOrg(orgList) {
    writeFileSync(filePath, JSON.stringify(orgList, null, 2));
  }

  static login(data: LoginData) {
    const orgs = this.getOrgs();
    return orgs.find((org) => {
      return org.login === data.login && org.password === data.password;
    });
  }

  static logOut() {
    this.loggedInOrg = null;
  }

  static doesExistOrgLogin({login}) {
    const orgs = this.getOrgs();
    return orgs.find((org) => org.login === login);
  }

  static doesExistOrgName ({name}) {
    const orgs = this.getOrgs();
    return orgs.find((org) => org.name === name);
  }
}

export const OrgRouter = express.Router();

OrgRouter.get('/org-list', (req, res) => {
  res.json(Organization.getAllOrgs());
});

OrgRouter.get('/logged-org', (req, res) => {
  res.json(Organization.loggedInOrg);
});

OrgRouter.get('/logout', (req, res) => {
  Organization.logOut();
  return res.status(200).end();
});

OrgRouter.post('/', (req, res) => {
  if (Organization.doesExistOrgLogin(req.body)) {
    return res.status(404).send({error: 'Login is registred'});
  }
  if (Organization.doesExistOrgName(req.body)) {
    return res.status(404).send({error: 'Name is registred'});
  }
  Organization.createOrg(req.body);
  res.status(200).end();
});

OrgRouter.post('/login', (req, res) => {
  const org = Organization.login(req.body);
  if (!org) {
    return res.status(404).send({error: 'Username or password is incorrect'});
  }
  Organization.loggedInOrg = org;
  return res.status(200).send({success: 'ok'});
});

OrgRouter.get('/:id', (req, res) => {
  res.json(Organization.getOrg(req.params.id));
});
