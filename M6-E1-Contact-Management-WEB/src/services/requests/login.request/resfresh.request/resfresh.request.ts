// refresh.request.ts
import { API_BASE_URL } from "@/services/api";

export async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const responseData = await response.json();
      const { newAccessToken } = responseData;

      // Verificar se o novo token é diferente do atual antes de atualizar
      const currentAccessToken = localStorage.getItem("@ContactManagement:accessToken");
      if (currentAccessToken !== newAccessToken) {
        localStorage.setItem("@ContactManagement:accessToken", newAccessToken);
        return newAccessToken;
      }
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);

    // Lançar o erro novamente para que o chamador possa lidar com ele conforme necessário
    throw error;
  }

  return null;
}
