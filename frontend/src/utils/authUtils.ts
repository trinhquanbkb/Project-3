// @flow
import { Cookies } from "react-cookie";
import { getAccessToken } from "./getAccessToken";

export const isUserAuthenticated = () => {
    const access_token = getAccessToken();
    if (!access_token) {
        return false;
    }
    return true;
};

export const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};