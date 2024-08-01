export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  name: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  crm: string;
  uf: string;
  phone: string;
  Cargo: number;
}
