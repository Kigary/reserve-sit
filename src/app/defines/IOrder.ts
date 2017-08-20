import {IUser} from './IUser';
import {ISit} from './ISit';

export interface IOrder {
  orderID: string;
  orgID: string;
  userID: string;
  user: IUser;
  sitID: string;
  sit: ISit;
  orderDate: Date;
  createdAt: Date;
  releaseDate: Date | null;
}
