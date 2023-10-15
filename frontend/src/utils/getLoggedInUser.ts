import { Cookies } from "react-cookie";

/**
 * Returns the logged in user
 */
export const getLoggedInUser = () => {
    const cookies = new Cookies();
    const accessToken = cookies.get("accessToken");
    return accessToken ? accessToken : null;
};
