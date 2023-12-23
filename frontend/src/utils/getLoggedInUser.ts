import { Cookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { IUserLogged } from "../models/user.model";
/**
 * Returns the logged in user
 */
export const getLoggedInUser = () => {
	const cookies = new Cookies();
	const accessToken = cookies.get("access_token");
	const userLogged: IUserLogged = jwtDecode(accessToken);
	return userLogged;
};
