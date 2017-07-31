import * as express from 'express';
import {readFileSync, writeFileSync} from 'fs';
import {createGUID} from './common/index';
import {join} from 'path';

const filePath = join(__dirname, './data/orgs.db.json');

class Organization {
  orgID: string = createGUID();
  parentOrgID?: string;
  name: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  fax?: string;
  email?: string;

  static getAllOrgs(): Organization[] {
    return JSON.parse(readFileSync(filePath).toString());
  }
  static getOrg(id: string): Organization {
    return this.getAllOrgs().find(org => org.orgID === id);
  }
}

export const OrgRouter = express.Router();

OrgRouter.get('/org-list', (req, res) => {
  res.json(Organization.getAllOrgs());
});

OrgRouter.get('/:id', (req, res) => {
  res.json(Organization.getOrg(req.params.id));
});
