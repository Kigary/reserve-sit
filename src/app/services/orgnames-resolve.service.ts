import { Injectable } from '@angular/core';
import { OrgService } from './org.service';
import { IOrg } from '../defines/IOrg';
import { Resolve } from '@angular/router';

@Injectable()
export class OrgNamesResolveService implements Resolve<IOrg[]> {

  constructor(private orgService: OrgService) { }

  resolve() {
    return this.orgService.getOrgNames();
  }
}
