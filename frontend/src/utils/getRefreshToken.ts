import { Cookies } from "react-cookie";

/**
 * Returns the logged in user
 */
export const getRefreshToken = () => {
    const cookies = new Cookies();
    const refreshToken = cookies.get("refresh_token");
    return refreshToken ?  refreshToken : null;
};
