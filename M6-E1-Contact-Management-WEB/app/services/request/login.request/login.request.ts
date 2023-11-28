import { Slide, toast } from "react-toastify";
import { API_BASE_URL } from "../../api";
import { ILogin, ILoginResponse } from "./@type.login";


export async function login(data: ILogin): Promise<ILoginResponse | null> {
  try {
    const body = {
      username: data.username,
      password: data.password,
    };

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const responseData: ILoginResponse = await response.json();
      const { accessToken, id } = responseData;

      localStorage.setItem("@ContactManagement:accessToken", accessToken);
      localStorage.setItem("@ContactManagement:id", id);
      toast.success("Logado com Sucesso!", {
        transition: Slide,
        autoClose: 2000,
      });
      return responseData;
    } 
  } catch (error) {
    toast.error("Ops! credenciais inválidas ou inexistentes!", {
      transition: Slide,
      autoClose: 2000,
    });
  }
  return null;
}
