
import Inputs from "../fragments/inputs/Inputs";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { api } from "@/app/services/api";

interface IFormLogin {
  username: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  username: string;
}

async function login(data: IFormLogin) {
  try {
    const body = {
      username: data.username,
      password: data.password,
    };
    const response = await api.post<ILoginResponse>("/login", body);
    const { token, username } = response.data;

    // Armazenar o token no localStorage
    localStorage.setItem("@ContactManagement:token", token);

    // Outras lógicas, se necessário

    console.log(token);
  } catch (error) {
    console.log(error);
  }
}

export const FormLogin: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  }: UseFormReturn<IFormLogin> = useForm<IFormLogin>();

  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    // Lógica para lidar com os dados do formulário após o envio
    login(data);
    reset();
  };

  return (
    <div className="">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Inputs
          htmlFor={""}
          type={"text"}
          label={"Usuário"}
          placeholder={"Digite o usuário"}
          {...register("username")}
          error={errors.username}
        />
        <Inputs
          htmlFor={""}
          label={"Senha"}
          type={"password"}
          placeholder={"Digite a sua senha"}
          {...register("password")}
          error={errors.password}
          required
        />
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
