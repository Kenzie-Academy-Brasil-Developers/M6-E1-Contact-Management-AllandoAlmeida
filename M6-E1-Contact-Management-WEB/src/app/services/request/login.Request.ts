import { Slide, toast } from "react-toastify";
import { API_BASE_URL } from "../api";

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  username: string;
  accessToken: string;
  id: string;
}

export async function login(data: ILogin): Promise<ILoginResponse | null> {
  try {
    console.log("Oi, estou dando console aqui no terminal");

    const body = {
      username: data.username,
      password: data.password,
    };

    console.log("RequestBody:", body);

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const responseData: ILoginResponse = await response.json();
      console.log("ResponseData:", responseData);

      const { accessToken, username, id } = responseData;
      console.log("accessToken:", accessToken);

      localStorage.setItem("@ContactManagement:accessToken", accessToken);
      localStorage.setItem("@ContactManagement:id", id);
      toast.success(`${username} Logado com Sucesso!`, {
        transition: Slide,
        autoClose: 2000,
      });
      return responseData;
    } else {
      console.error("Erro na solicitação:", response.statusText);

      return null;
    }
  } catch (error) {
    toast.error("Ocorreu um erro ao tentar se cadastrar.", {
      transition: Slide,
      autoClose: 2000,
    });
  }
  return null;
}
