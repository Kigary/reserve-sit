import { ISit } from '../defines/ISit';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { SitService } from './sit.service';


@Injectable()
export class SitsResolverService implements Resolve<ISit[]> {

  constructor(private sitServise: SitService) { }

  resolve() {
    return this.sitServise.getAllSits();
  }
}
