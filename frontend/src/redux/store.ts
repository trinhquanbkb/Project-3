import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { api } from "../api";
import rootReducer from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV === "development",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		})
			.concat(sagaMiddleware)
			.concat(api.middleware),
});
sagaMiddleware.run(sagas);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
