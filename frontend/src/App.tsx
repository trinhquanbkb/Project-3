import React from "react";

import Routes from "./routes/Routes";

// Themes
import "./assets/scss/Theme.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const App = () => {
	return (
		<>
			<Routes></Routes>
			<ToastContainer />
		</>
	);
};

export default App;
