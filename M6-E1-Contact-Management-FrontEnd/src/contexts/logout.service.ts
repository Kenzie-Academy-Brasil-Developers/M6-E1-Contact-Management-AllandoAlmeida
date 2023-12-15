// logout.service.ts
'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {

    localStorage.removeItem("@Management:accessToken");
    localStorage.removeItem("@Management:refreshToken");
    router.push("/");
  };

  
  useEffect(() => {
    logout();
  }, []);

  return { logout };
};
