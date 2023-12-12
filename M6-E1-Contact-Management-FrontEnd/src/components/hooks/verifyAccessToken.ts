
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const verifyAccessToken = async () => {
  const accessToken = getCookie("Management.accessToken", { cookies });
  console.log("accessToken", accessToken);

  if (!accessToken) {
    redirect("/");
  }

  return accessToken;
};


/* import nookies, {parseCookies}from 'nookies'
import { redirect } from "next/navigation";

export const verifyAccessToken = async () => {
  const accessToken = parseCookies()
  const testToken = nookies.get(null)
  console.log("Token", {accessToken});
  console.log("Token", {testToken});

  if (!accessToken['Management.accessToken']) {
    redirect("/");
  }

  return accessToken['Management.accessToken'];
};
 */