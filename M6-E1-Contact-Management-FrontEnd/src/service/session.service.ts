/* import { Slide, toast } from "react-toastify";
import { API_BASE_URL } from "@/service/api";

export interface ISession {
  username: string;
  password: string;
}

export interface ISessionResponse {
  token: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  id: string;
  expiresIn: number;
}

export async function Session(data: ISession) {
  try {
    console.log("SessionLogin", data);

    const body = {
      username: data.username,
      password: data.password,
    };

    const response = await fetch(`${API_BASE_URL}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const responseData: ISessionResponse = await response.json();
      const { accessToken, refreshToken, id } = responseData;

      localStorage.setItem("@Management:accessToken", accessToken);
      localStorage.setItem("@Management:refreshToken", refreshToken);

      toast.success("Logado com Sucesso!", {
        transition: Slide,
        autoClose: 2000,
      });

      return responseData;
    }
  } catch (error) {
    console.error("Erro durante o login:", error);

    // Exibindo um toast de erro
    toast.error("Ops! credenciais inválidas ou inexistentes!", {
      transition: Slide,
      autoClose: 2000,
    });

    return null;
  }
}

export async function isTokenExpired() {
  const accessToken = localStorage.getItem("@Management:accessToken");

  if (accessToken) {
    try {
      const accessTokenData: ISessionResponse = JSON.parse(
        atob(accessToken.split(".")[1])
      );

   
      const expirationTime = accessTokenData.expiresIn * 1000; 
      const currentTime = new Date().getTime();

     
      const timeThreshold = 5 * 60 * 1000;

      return expirationTime - currentTime < timeThreshold;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return false;
    }
  }

  return false;
}

export async function updateToken() {
  try {
    const refreshToken = localStorage.getItem("@Management:refreshToken");

    if (refreshToken) {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const responseData: ISessionResponse = await response.json();
        const { accessToken, refreshToken, id } = responseData;

        localStorage.setItem("@Management:accessToken", accessToken);
        localStorage.setItem("@Management:refreshToken", refreshToken);
        localStorage.setItem("@Management:id", id);

        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Erro ao atualizar o token:", error);
    return false;
  }
}

 */