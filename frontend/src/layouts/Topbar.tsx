import React from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";

// images
import profilePic from "../assets/images/users/avatar-1.jpg";
import logoSm from "../assets/images/logo-sm.png";
import logoDark from "../assets/images/logo-warehouse.png";
import logoLight from "../assets/images/logo-light.png";
import { Button } from "react-bootstrap";
import { getLoggedInUser } from "../utils/getLoggedInUser";

export interface NotificationItem {
	id: number;
	text: string;
	subText: string;
	icon?: string;
	avatar?: string;
	bgColor?: string;
}

// get the profilemenu
const ProfileMenus = [
	{
		label: "Thông tin tài khoản",
		icon: "user",
		redirectTo: "/user-infor",
	},
	{
		label: "Logout",
		icon: "log-out",
		redirectTo: "/auth/logout",
	},
];

interface TopbarProps {
	hideLogo?: boolean;
	navCssClasses?: string;
	openLeftMenuCallBack?: () => void;
	topbarDark?: boolean;
}

const Topbar = ({
	hideLogo,
	navCssClasses,
	openLeftMenuCallBack,
	topbarDark,
}: TopbarProps) => {
	const navbarCssClasses: string = navCssClasses || "";
	const containerCssClasses: string = !hideLogo ? "container-fluid" : "";

	return (
		<React.Fragment>
			<div className={`navbar-custom ${navbarCssClasses}`}>
				<div
					className={`d-flex flex-row justify-content-between ${containerCssClasses}`}
				>
					{!hideLogo && (
						<div className="logo-box">
							<Link to="/" className="logo logo-dark">
								<span className="logo-sm">
									<img src={logoSm} alt="" height="50" />
								</span>
								<span className="logo-lg">
									<img src={logoDark} alt="" height="72" />
								</span>
							</Link>
							<Link to="/" className="logo logo-light">
								<span className="logo-sm">
									<img src={logoSm} alt="" height="50" />
								</span>
								<span className="logo-lg">
									<img src={logoLight} alt="" height="42" />
								</span>
							</Link>
						</div>
					)}

					<div
						style={{ width: "fit-content" }}
						className="d-flex justify-content-between"
					>
						<div className="btn-warehouse-wrapper">
							<Button className="btn-warehouse me-1">
								{getLoggedInUser().warehouse_id.name}
							</Button>
						</div>
						<ul className="list-unstyled topnav-menu float-end mb-0">
							<li className="dropdown notification-list topbar-dropdown">
								<ProfileDropdown
									profilePic={profilePic}
									menuItems={ProfileMenus}
									username={"Nik Patel"}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Topbar;
