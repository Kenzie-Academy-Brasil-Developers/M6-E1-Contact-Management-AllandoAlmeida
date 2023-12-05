// logout.service.ts
'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    console.log("Chamando logout");
    localStorage.removeItem("@Management:accessToken");
    localStorage.removeItem("@Management:refreshToken");
    router.push("/", { replace: true });
  };
  console.log('passou')
  
  useEffect(() => {
    logout();
  }, []);

  return { logout };
};
