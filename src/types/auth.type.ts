export interface RegisterPayload{
    fullName: string,
    email: string,
    company: string,
    job: string,
    country: string,
    password: string
}
export interface User {
    id: number;
    email: string;
    fullName: string;
    avatar?: string;
  }
  