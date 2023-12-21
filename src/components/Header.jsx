import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<nav className="navbar bg-light mb-5 p-0">
			<div className="container">
				<Link
					to="/"
					className="navbar-brand"
				>
					<div className="d-flex py-3">
						<img
							src={logo}
							alt="logo"
							className="mr-2 object-fit-contain"
						/>
						<div className="fs-2 fw-bold">Project Creator</div>
					</div>
				</Link>
			</div>
		</nav>
	);
};

export default Header;
