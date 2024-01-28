import axios from "axios";
import { Cookies } from "react-cookie";

export async function postRequest(url: string, body: object) {
	try {
		let response = await axios.post(
			process.env.REACT_APP_BASE_URL + url,
			body,
			generateRequestHeader()
		);
		return response.data;
	} catch (error) {
		handleErrorCode(error);
		throw error;
	}
}
export async function getRequest(url: string, param: string) {
	try {
		let response = await axios.get(
			process.env.REACT_APP_BASE_URL + url + "?" + param,
			generateRequestHeader()
		);
		return response.data;
	} catch (error) {
		handleErrorCode(error);
		throw error;
	}
}

export async function deleteRequest(url: string) {
	try {
		let response = await axios.delete(
			process.env.REACT_APP_BASE_URL + url,
			generateRequestHeader()
		);
		return response.data;
	} catch (error) {
		handleErrorCode(error);
		throw error;
	}
}

export async function putRequest(url: string, body: any) {
	try {
		let response = await axios.put(
			process.env.REACT_APP_BASE_URL + url,
			body,
			generateRequestHeader()
		);
		return response.data;
	} catch (error) {
		handleErrorCode(error);
		throw error;
	}
}

export function generateRequestHeader() {
	const cookies = new Cookies();
	const accessToken = cookies.get("access_token");
	return {
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
	};
}

export const handleErrorCode = (err: any) => {
	switch (err.response.status) {
		case 401:
			//message.error(err.message)
			break;
		default:
			break;
	}
};
