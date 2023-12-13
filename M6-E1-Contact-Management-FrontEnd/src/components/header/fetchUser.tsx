"use server";
import { jwtDecode } from "jwt-decode";
import { verifyAccessToken } from "../hooks/verifyAccessToken";
import { api } from "@/service/api";
import { CustomerData } from "@/schema/customer.schema";

export const fetchUser = async () => {
  try {
    const accessToken = await verifyAccessToken();
    const decodedToken = jwtDecode(accessToken);
    const userId: string = decodedToken.sub ?? "";

    if (!accessToken) {
      return null;
    }

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const response: CustomerData = await api.get(`/customers/${userId}`);
    return response;
  } catch (error) {
    console.error("Erro ao obter dados do perfil:", error);
    return null;
  }
};

