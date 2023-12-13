
import { deleteCookie, getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 90
export const verifyAccessToken = async () => {
  const accessToken = getCookie("Management.accessToken", { cookies });
  if (!accessToken) {
    redirect("/");
  }

  return accessToken;
};

