import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
import { api } from "../api";

export default combineReducers({
	Auth,
	Layout,
	[api.reducerPath]: api.reducer,
});
