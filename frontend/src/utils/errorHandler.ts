import { AxiosError } from "axios";

// type guard
function isAxiosError(error: unknown): error is AxiosError {
    return typeof error === "object";
}

const errorHandler = (error:unknown) =>  {
    if(isAxiosError(error) && error?.response) return error.response.data.message; 
    return "Lỗi không xác định";
}
export default errorHandler;