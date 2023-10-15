import React from "react";
import { Redirect } from "react-router-dom";
import { isUserAuthenticated } from "../utils/authUtils";

const Root = () => {
	const getRootUrl = () => {
		let url: string = "auth";

		// check if user logged in or not and return url accordingly
		if (isUserAuthenticated() === false) {
			url = "auth/login";
		} else {
			url = "dashboard/ecommerce";
		}
		return url;
	};

	const url = getRootUrl();

	return <Redirect to={`/${url}`} />;
};

export default Root;
