export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
  phone: string;
  height?:number;
  weight?: number;
  username?: string;
}
