import { Cookies } from "react-cookie";

/**
 * Returns the logged in user
 */
export const getAccessToken = () => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    return accessToken ?  accessToken : null;
};
