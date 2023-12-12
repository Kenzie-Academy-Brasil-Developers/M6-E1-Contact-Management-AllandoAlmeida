"use client";
import {
  isTokenExpired,
  updateToken,
} from "@/service/session.service";
import { api } from "@/service/api";

import { Slide, toast } from "react-toastify";

export interface IContactUpdate {
  name?: string;
  zipCode?: string;
  street?: string;
  complement?: string;
  district?: string;
  locality?: string;
  state?: string;
  telephone?: string;
  email?: string;
}

export async function upDateContact(contactId: string, data: IContactUpdate) {
  console.log("alterar", contactId);
  console.log("alterar data", data);
  const accessToken = localStorage
    .getItem("@Management:accessToken")
    ?.replace(/"/g, "");

  if (accessToken) {
    const accessTokenData = JSON.parse(atob(accessToken.split(".")[1]));

    if (await isTokenExpired()) {
      const updatedToken = await updateToken();

      if (!updatedToken) {
        console.error("Falha ao atualizar o token");
        throw new Error("Falha ao atualizar o token");
      }
    }

    const customerId = accessTokenData.sub;
    console.log("customerId:", customerId);

    if (!customerId) throw new Error("Customer not found!");

    try {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const response = await api.patch(`contacts/${contactId}`, data);

      console.log("response contact", response);
      if (response.status === 200) {
        toast.success("Contato Registrado com sucesso", {
          transition: Slide,
          autoClose: 2000,
        });
      } else {
        console.error("Erro:", response.statusText);
        return null;
      }
    } catch (error) {
      toast.error("Ops! Cadastro não concluido.", {
        transition: Slide,
        autoClose: 2000,
      });
      return null;
    }
  }
}

export async function deleteContactById(contactId: string) {
  console.log("deletar", contactId);
  const accessToken = localStorage
    .getItem("@Management:accessToken")
    ?.replace(/"/g, "");

  if (accessToken) {
    const accessTokenData = JSON.parse(atob(accessToken.split(".")[1]));

    if (await isTokenExpired()) {
      const updatedToken = await updateToken();

      if (!updatedToken) {
        console.error("Falha ao atualizar o token");
        throw new Error("Falha ao atualizar o token");
      }
    }

    const customerId = accessTokenData.sub;
    console.log("customerId:", customerId);

    if (!customerId) throw new Error("Customer not found!");

    try {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      await api.delete(`contacts/${contactId}`);

      toast.success("Exclusão realizada com Sucesso!", {
        transition: Slide,
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao tentar realizar a operação solicitada.", {
        transition: Slide,
        autoClose: 2000,
      });
    }
  }
  return Promise.resolve();
}
