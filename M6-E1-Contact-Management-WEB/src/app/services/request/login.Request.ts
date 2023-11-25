import { API_BASE_URL } from "../api";


export interface ILoginForm {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  username: string;
  accessToken: string;
  id: string;
}

export async function login(data: ILoginForm): Promise<ILoginResponse | null> {
  try {
    console.log("Oi, estou dando console aqui no terminal");

    const body = {
      username: data.username,
      password: data.password,
    };

    console.log('RequestBody:', body);

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    
    if (response.ok) {
      const responseData: ILoginResponse = await response.json();
      console.log('ResponseData:', responseData);

      const { accessToken, username, id } = responseData;
      console.log('accessToken:', accessToken);

     
      localStorage.setItem("@ContactManagement:accessToken", accessToken);
      localStorage.setItem("@ContactManagement:id", id);

      return responseData;
    } else {
      console.error('Erro na solicitação:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    return null;
  }
}

