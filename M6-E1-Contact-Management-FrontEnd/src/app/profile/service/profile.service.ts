// profile.service.ts
'use client'
import { ISessionResponse, isTokenExpired, updateToken } from "@/app/(login)/service/session.service";
import { API_BASE_URL } from "@/service/api";

export async function fetchProfile(userId: string) {
  try {
    const tokenWithQuotes = localStorage.getItem("@Management:accessToken");

    if (tokenWithQuotes) {
      const token = tokenWithQuotes.replace(/"/g, "");

      if (await isTokenExpired()) {
        const updatedToken = await updateToken();

        if (!updatedToken) {
          console.error("Falha ao atualizar o token");
          return null;
        }
      }

      const accessTokenData: ISessionResponse = JSON.parse(
        atob(token.split(".")[1])
      );
      const userid = accessTokenData.id;

   
      const response = await fetch(`${API_BASE_URL}/customers/${userId}`, {
        method:'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response', response)

      if (response.ok) {
        return response.json();
      }

      console.error("Falha ao obter dados do perfil");
      return null;
    }
  } catch (error) {
    console.error("Erro durante a busca do perfil:", error);
    return null;
  }
}