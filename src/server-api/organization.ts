import * as express from 'express';
import {readFileSync, writeFileSync} from 'fs';
import {createGUID} from './common/index';
import {join} from 'path';

const filePath = join(__dirname, './data/sit.db.json');

class Organization {
  organizationId: string = createGUID();
  name: string;
  hotLine: string;
  email: string;

  static getAllOrganizations(): Organization[] {
    return JSON.parse(readFileSync(filePath).toString());
  }
  static getOrganization(id: string): Organization {
    return this.getAllOrganizations().find(org => org.organizationId === id);
  }
}

export const OrganizationRouter = express.Router();

OrganizationRouter.get('/organization-list', (req, res) => {
  res.json(Organization.getAllOrganizations());
});

OrganizationRouter.get('/:id', (req, res) => {
  res.json(Organization.getOrganization(req.params.id));
});
