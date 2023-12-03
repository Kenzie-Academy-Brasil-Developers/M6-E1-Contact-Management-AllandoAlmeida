// logout.service.ts
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    console.log("Chamando logout");
    localStorage.removeItem("@Management:accessToken");
    localStorage.removeItem("@Management:refreshToken");
  };
  console.log('passou')
  router.push("/", { replace: true });
  
  useEffect(() => {
    logout();
  }, []);

  return { logout };
};
