import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const verifyToken = () => {
  const accessToken = getCookie("Management.accessToken", { cookies });
  console.log("accessToken", accessToken);

  if (!accessToken) {
    redirect("/");
  }

  return accessToken;
};
