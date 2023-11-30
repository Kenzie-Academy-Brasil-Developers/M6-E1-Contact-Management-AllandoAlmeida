export interface ILogin {
    username: string;
    password: string;
  }
  
  export interface ILoginResponse {
    token: string;
    username: string;
    accessToken: string;
    refreshToken: string;
    id: string;
  }
  