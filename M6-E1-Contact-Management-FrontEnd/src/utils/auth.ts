// ./src/utils/auth.ts
import { getCookie, CookieValueTypes } from "cookies-next";
import { IncomingMessage } from "http";

type GetAccessTokenParams = {
  cookies?: any; // Update this type based on the actual type of your cookies object
};

export const getAccessToken = ({ cookies }: GetAccessTokenParams): CookieValueTypes | null => {
  
    // If cookies is provided, it's a client-side request
  if (cookies) {
    return getCookie("Management.accessToken", { cookies });
  }

  // Handle other cases or return a default value
  return null;
};
