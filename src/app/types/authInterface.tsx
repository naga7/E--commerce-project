export interface successLogin {
  message: string;
  user: UserReasponse;
  token: string;
}
export interface UserReasponse {
  name: string;
  email: string;
  role: string;
}
export interface failedLogin {
  statusMsg: string;
  message: string;
}
