import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IOrder } from '../../../defines/IOrder';
import { IPagingData } from '../../../defines/IPagingData';

export interface IPagingConfig {
  pageSize: number;
  pageIndex: number;
  pageSizeOptions: number[];
}

const setPagingConfigToParams = (config: IPagingConfig, params) => {
  return params.set('size', config.pageSize).set('index', config.pageIndex);
};

@Injectable()
export class OrderService {
  pagingConfig = {
    pageSize: 10,
    pageIndex: 0,
    pageSizeOptions: [5, 10, 20]
  } as IPagingConfig;

  constructor(private http: HttpClient) { }

  finishOrder(orderID) {
    return this.http.get(`/api/org/finish/${orderID}`) as Observable<IOrder>;
  }

  getOrgReservations(search: string = '') {
    return this.http.get(`/api/org/reserved`, {
      params: new HttpParams().set('search', search)
    }) as Observable<IOrder[]>;
  }

  getOrgArchivedOrders(search: string = '') {
    return this.http.get(`/api/org/archive`, {
      params: setPagingConfigToParams(this.pagingConfig, new HttpParams().set('search', search))
    }) as Observable<IPagingData<IOrder>>;
  }
}
