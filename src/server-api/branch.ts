import * as express from 'express';
import {readFileSync, writeFileSync} from 'fs';
import {createGUID} from './common/index';
import {join} from 'path';

const filePath = join(__dirname, './data/sit.db.json');

class Branch {
  branchId: string = createGUID();
  organizationId: string;
  name: string;
  address: string;
  phoneNumber: string;

  static getAllBranches(): Branch[] {
    return JSON.parse(readFileSync(filePath).toString());
  }
  static getBranch(id: string): Branch {
    return this.getAllBranches().find(b => b.branchId === id);
  }
}

export const BranchRouter = express.Router();

BranchRouter.get('/branch-list', (req, res) => {
  res.json(Branch.getAllBranches());
});

BranchRouter.get('/:id', (req, res) => {
  res.json(Branch.getBranch(req.params.id));
});
