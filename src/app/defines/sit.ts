export interface Sit {
  sitID: string;
  orgID: string;
  numOfSeats: number;
  reserved: boolean;
  cost: number;
  paid: boolean;
  image: string;
  parentOrgID?: string;
}
