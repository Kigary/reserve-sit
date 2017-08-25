import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ISit } from '../../../defines/ISit';
import { SitService } from '../sit/sit.service';

@Injectable()
export class SitsResolverService implements Resolve<ISit[]>{

  constructor(private sitService: SitService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.sitService.getAllSits();
  }
}
