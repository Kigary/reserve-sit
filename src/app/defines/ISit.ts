import {IOrg} from './IOrg';

export interface ISit {
  sitID: string;
  orgID: string;
  name: string;
  numOfSeats: number;
  reserved: boolean;
  cost: number;
  paid: boolean;
  image: string;
  org?: IOrg;
}
