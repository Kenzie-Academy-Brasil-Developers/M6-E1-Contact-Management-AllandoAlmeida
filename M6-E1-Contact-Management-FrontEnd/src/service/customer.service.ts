/* "use server";
import { Slide, toast } from "react-toastify";
import { TCustomerParams } from "../../service/profile.service";
import { api } from "../../../../service/api";
import { verifyAccessToken } from "@/components/hooks/verifyAccessToken";

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
  const accessToken = await verifyAccessToken();
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
};

export const deleteCustomerParams = async ({ params }: TCustomerParams) => {
  console.log("params", params);

  const accessToken = await verifyAccessToken();
  console.log("accessToken", accessToken);
  try {
    const customerId = params.customerId;
    console.log(customerId);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await api.delete(`/customers/${customerId}`);

    console.log("response contact", response);
    if (response.status === 204) {
      const customer = response.data;
      console.log("customer", customer);
      return customer;
    } else {
      console.error("Erro:", response.statusText);
      return null;
    }
  } catch (error) {
    console.log("Ops! Cadastro não concluído.", error);
    return null;
  }
};
 */