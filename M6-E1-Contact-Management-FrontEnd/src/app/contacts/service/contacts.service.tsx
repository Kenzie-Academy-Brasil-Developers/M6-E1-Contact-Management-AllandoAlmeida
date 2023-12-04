import { isTokenExpired, updateToken } from "@/app/(login)/service/session.service";
import { api } from "@/service/api";
import { toast, Slide } from "react-toastify";
import { IContact } from "./@Type.contact";

// refresh.request.ts

  
    export async function newContact(data: IContact) {

      const accessToken = localStorage
      .getItem("@Management:accessToken")
      ?.replace(/"/g, "");
    
        console.log("token", accessToken)
        console.log("Raw accessToken from storage:", localStorage.getItem("@Management:accessToken"));
    
      const tokenWithQuotes = localStorage.getItem("@Management:accessToken");
      if (tokenWithQuotes) {
        const token = tokenWithQuotes.replace(/"/g, "");
        const accessTokenData = JSON.parse(atob(token.split(".")[1]));
    
        if (await isTokenExpired()) {
          const updatedToken = await updateToken();
    
          if (!updatedToken) {
            console.error("Falha ao atualizar o token");
            throw new Error("Falha ao atualizar o token");
          }
        }
    
        const customerId = accessTokenData.sub
        console.log("customerId:", customerId);
    
      if (!customerId) throw new Error("Customer not found!");
      try {
       api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        const response = await api.post("/contacts", data);
        console.log("response", response);
    
        if (response.status === 201) {
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
    
     
