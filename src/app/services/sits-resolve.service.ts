import { Injectable } from '@angular/core';
import { ISit } from '../defines/ISit';
import { SitService } from './sit.service';
import { Resolve } from '@angular/router';

@Injectable()
export class SitsResolveService implements Resolve<ISit[]> {

  constructor(private sitServise: SitService) { }
  resolve() {
    return this.sitServise.getAllSits();
  }
}
