import { IOrg } from '../defines/IOrg';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { OrgService } from './org.service';

@Injectable()
export class OrgNamesResolverService implements Resolve<IOrg[]> {

  constructor(private orgService: OrgService) { }

  resolve() {
    return this.orgService.getOrgNames();
  }
}
