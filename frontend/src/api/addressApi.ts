import axios from "axios";

export const getAddressApi = async () => {
	const externalApiUrl = "https://provinces.open-api.vn/api/?depth=3";
	const axiosInstance = axios.create({
		baseURL: "",
	});
	const response = await axiosInstance.get(externalApiUrl);
	return response.data;
};
