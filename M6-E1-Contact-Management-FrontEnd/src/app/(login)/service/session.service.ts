import { Slide, toast } from "react-toastify";
import { API_BASE_URL, api } from "@/service/api";

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
      localStorage.setItem("@Management:id", id);

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

/* 
export const SessionLogin = async (data: ISession) => {
  console.log("SessionLogin", data);
  try {
    const body = {
      username: data.username,
      password: data.password,
    };
   

    const response = await api.post("/session", body);

    const { accessToken, id } = response.data;
    localStorage.setItem("@ContactManagement:accessToken", accessToken);
    localStorage.setItem("@ContactManagement:id", id);

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    toast.success("Login realizado com Sucesso!", {
      transition: Slide,
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Erro durante o login:", error);
    toast.error("Ocorreu um erro ao tentar realizar a operação solicitada.", {
      transition: Slide,
      autoClose: 2000,
    });
  }
};
 */
