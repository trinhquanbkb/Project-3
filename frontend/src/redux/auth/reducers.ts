import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { History } from "history";

interface AuthStateType {
    error: any;
    userSignUp: any;
    loading: any;
	login: {
		loading: boolean;
		data: {
			data?: AxiosResponse;
			user: any;
		};
		error?: AxiosError;
	};
	logout: {
		loading: boolean;
		error?: AxiosError;
	};
}
const AuthInitialStates: AuthStateType = {
	login: {
		loading: false,
		data: {
			user: null,
		},
	},
	logout: {
		loading: false,
	},
	error: undefined,
	userSignUp: undefined,
	loading: undefined
};

const Auth = createSlice({
	name: "auth",
	initialState: AuthInitialStates,
	reducers: {
		initLoginUser: (
			state,
			action: PayloadAction<{ email: string; password: string }>
		) => {
			state.login.loading = true;
		},
		loginUserSuccess: (state, action) => {
			state.login.data.user = action.payload;
			state.login.loading = false;
			state.login.error = undefined;
		},
		loginUserFailed: (state, action: PayloadAction<AxiosError>) => {
			state.login.error = action.payload;
			state.login.loading = false;
		},
		logoutUser: (state, action: PayloadAction<{ history: History }>) => {
			state.login.data.user = null;
		},
	},
});

// Actions
export const { initLoginUser, loginUserSuccess, loginUserFailed, logoutUser } =
	Auth.actions;

// Selectors
export const selectUser = (state: AuthStateType) => state.login.data.user;
export const selectLoginUser = (state: AuthStateType) => state.login;
export const selectLogoutUser = (state: AuthStateType) => state.logout;

// Reducer
export default Auth.reducer;
