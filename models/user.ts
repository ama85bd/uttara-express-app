export interface IUserLogin {
  username: string;
  password: string;
}

export interface ILoginCredential {
  USER_ID: string;
  NAME: string;
  USERNAME: string;
  LEVEL: string;
  PHONE: string;
  EMAIL: string;
  DEPARTMENT: number;
  DESIGNATION: number;
  OUTLET: number;
  orgID: number;
  HOME: number;
  user_level: number;
  employeeID: number;
}

export interface IMerchantRegister {
  name: string;
  contactperson: string;
  contact: string;
  loginname: string;
  facebookpagelink: string;
  district: string;
  policestationthana: string;
  address: string;
  password: string;
}
