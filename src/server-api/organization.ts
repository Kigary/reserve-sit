import * as express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { createGUID } from './common/index';
import { LoginData } from './defines/loginData';
import { IOrg } from '../app/defines/IOrg'; // TODO


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
    // copies every property of data to this
    Object.assign(this, data);
  }

  static getOrgs(): Organization[] {
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
    this.saveAllOrgs(orgs);
  }

  static updateOrg(data) {
    const orgs = this.getOrgs();
    const orgIndex = orgs.findIndex(o => o.orgID === data.orgID);
    orgs.splice(orgIndex, 1, data);
    this.saveAllOrgs(orgs);
    return data;
  }

  static saveAllOrgs(orgList) {
    writeFileSync(filePath, JSON.stringify(orgList, null, 2));
  }

  static login(data: LoginData) {
    const orgData = this.getOrgs()
      .find((org) => {
      return org.login === data.login && org.password === data.password;
    });
    return Organization.dataToOrg(orgData);
  }

  static getOrgBySessionKey(sessionKey?: string) {
    if (!sessionKey) {
      return null;
    }

    const orgData = this.getOrgs().find(org => org.sessionKeys.includes(sessionKey));
    return Organization.dataToOrg(orgData);
  }

  static dataToOrg(data) {
    return data && new Organization(data);
  }

  static doesExistOrgLogin({login}) {
    const orgs = this.getOrgs();
    return orgs.find((org) => org.login === login);
  }

  static doesExistOrgName ({name}) {
    const orgs = this.getOrgs();
    return orgs.find((org) => org.name === name);
  }

  static  getOrgNames() {
    return this.getOrgs().map((org) => {
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

  // static logOut() {
  //   this.loggedInOrg = null;
  // }
  //

}

export const OrgRouter = express.Router();

OrgRouter.post('/login', (req, res) => {
  const org = Organization.login(req.body);
  if (!org) {
    res.cookie('sessionKey', ''); // TRY LATER cookie.remove('sessionKey')
    return res.status(404).send({error: 'Username or password is incorrect'});
  }
  const sessionKey = createGUID();
  res.cookie('sessionKey', sessionKey, {maxAge: new Date(2024, 0, 1), httpOnly: true});
  org.addSessionKey(sessionKey);

  res.status(200).send({success: 'ok'});
});

OrgRouter.get('/is-logged-in', (req, res) => {
  res.json(!!req.loggedInOrg);
});
OrgRouter.get('/org-names', (req, res) => {
  res.json(Organization.getOrgNames());
});
OrgRouter.get('/logged-org', (req, res) => {
  const loggedInOrg = req.loggedInOrg;
  res.json(loggedInOrg);
});

OrgRouter.get('/logout', (req, res) => {
  const {sessionKey} = req.cookies;
  const loggedInOrg = req.loggedInOrg;

  loggedInOrg && loggedInOrg.removeSessionKey(sessionKey);

  res.cookie('sessionKey', '');
  return res.status(200).end(); // TRY
});

OrgRouter.get('/org-list', (req, res) => {
  res.json(Organization.getAllOrgs());
});

OrgRouter.post('/', (req, res) => {
  if (Organization.doesExistOrgLogin(req.body)) {
    return res.status(404).send({message: 'Login is registred'});
  }
  if (Organization.doesExistOrgName(req.body)) {
    return res.status(404).send({message: 'Name is registred'});
  }
  Organization.createOrg(req.body);
  res.status(200).end();
});

// OrgRouter.get('/:id', (req, res) => {
//   res.json(Organization.getOrg(req.params.id));
// });
