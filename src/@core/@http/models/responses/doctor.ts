export interface IDoctor {
  fullName: string;
  phones: string[];
  email: string;
  crm: string;
  gender: number;
  profilePictureUrl?: string;
  profilePicture?: any;
  [key: string]: any;
}
