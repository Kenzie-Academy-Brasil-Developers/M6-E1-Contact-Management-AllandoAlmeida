import { api } from "@/service/api";
import { verifyToken } from "@/session/verifyToken";
import { Slide, toast } from "react-toastify";
import { TCustomerParams } from "../../service/profile.service";

export interface ICustomerType {
  username?: string;
  name?: string;
  telephone?: string;
  email?: string;
}

export const upDateCustomerParams = async (
 { params }: TCustomerParams,
  data: ICustomerType
) => {
  const accessToken = await verifyToken();
  console.log("accessToken", accessToken);
  try {
    const customerId = params.customerId;
    console.log(customerId);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.patch(`customers/${customerId}`, data);
    console.log(response);

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

export const  deleteCustomerParams = async ({ params }: TCustomerParams) => {
  console.log("params", params);

  const accessToken = await verifyToken();
  console.log("accessToken", accessToken);
  try {
    const customerId = params.customerId;
    console.log(customerId);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      await api.delete(`customers/${customerId}`);

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
    return Promise.resolve();
  }