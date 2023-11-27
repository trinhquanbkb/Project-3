import React from "react";

export default function Loading() {
	return (
		<div className="spinner-loading">
			<div className="spinner-border text-danger m-2" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}
