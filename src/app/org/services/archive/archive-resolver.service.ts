import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ArchiveService } from './archive.service';
import { IOrder } from '../../../defines/IOrder';

@Injectable()
export class ArchiveResolverService implements Resolve<IOrder[]>{
  constructor(private archiveService: ArchiveService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.archiveService.getArchive();
  }
}
