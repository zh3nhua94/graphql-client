import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="d-flex justify-content-center align-items-center flex-column mt-5">
			<FaExclamationTriangle
				className="text-danger"
				size="5em"
			/>
			<h1>Page Not Found</h1>
			<p className="lead">Sorry, this page does not exist</p>
			<Link
				to="/"
				className="btn btn-primary"
			>
				Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
