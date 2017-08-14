export interface IOrg {
  orgID: string;
  name: string;
  login: string;
  password: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  fax?: string;
  email?: string;
  sessionKeys: string[];
}
