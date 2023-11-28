import { API_BASE_URL } from "../../api";
import { ISignUp, ISignUpResponse } from "./@type.register";


export async function signUp(data: ISignUp): Promise<ISignUpResponse | null> {
  try {
    const body = {
      name: data.name,
      username: data.username,
      password: data.password,
      telephone: data.telephone,
      email: data.email,
    };
    const response = await fetch(`${API_BASE_URL}/customers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const responseData: ISignUpResponse = await response.json();
      return responseData;
    } else {
      console.error("Erro na solicitação:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    return null;
  }
}