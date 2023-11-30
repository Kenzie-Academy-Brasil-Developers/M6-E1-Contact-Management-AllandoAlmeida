import { API_BASE_URL } from "@/services/api";
import { toast, Slide } from "react-toastify";
import { ILogin, ILoginResponse } from "./@type.login";
import { refreshAccessToken } from "./resfresh.request/resfresh.request";

// Adicione estes logs na função login
export async function login(data: ILogin): Promise<ILoginResponse | null> {
  try {
    console.log('Antes da requisição de login');

    const body = {
      username: data.username,
      password: data.password,
    };

    console.log("Método da requisição:", `${API_BASE_URL}/login`);
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("Resposta da requisição:", response);

    if (response.ok) {
      const responseData: ILoginResponse = await response.json();
      const { accessToken, refreshToken, id } = responseData;

      console.log("Dados de resposta:", responseData);

      // Armazenando os tokens no localStorage
      localStorage.setItem("@ContactManagement:accessToken", accessToken);
      localStorage.setItem("@ContactManagement:refreshToken", refreshToken);
      localStorage.setItem("@ContactManagement:id", id);

      // Exibindo um toast de sucesso
      toast.success("Logado com Sucesso!", {
        transition: Slide,
        autoClose: 2000,
      });

      // Chamando a função refreshAccessToken após o login
      await refreshAccessToken(refreshToken);

      console.log("Login bem-sucedido! Retornando dados de resposta.");

      // Retornando os dados de resposta
      return responseData;
    }
  } catch (error) {
    console.error("Erro durante o login:", error);

    // Exibindo um toast de erro
    toast.error("Ops! credenciais inválidas ou inexistentes!", {
      transition: Slide,
      autoClose: 2000,
    });
  }

  console.log("Login não foi bem-sucedido. Retornando null.");

  return null;
}
