import React, { useState } from "react";
import { MenuItems } from "../data/NavbarLandingData";
import "./NavbarLanding.css";
import Edi from "../../../img/logo.png";

export const NavbarLanding = () => {
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);

	return (
		<div>
			<nav className="navbarItems2">
				<div>
					<img className="logo__user2" src={Edi} height="60px" width="60px" />
				</div>
				<div
					className="menu-icon2"
					onClick={e => {
						handleClick();
					}}>
					<i className={click ? "fas fa-times" : "fas fa-bars"} />
				</div>

				<ul className={click ? "nav-menu2 active" : "nav-menu2"}>
					{MenuItems.map((item, index) => {
						return (
							<li key={index}>
								<a className={item.cName} href={item.path}>
									{item.title}
								</a>
							</li>
						);
					})}
				</ul>

				<a href="/login">
					<button className="btn__navbar" href="/login">
						<i className="fas fa-user" />
					</button>
				</a>
			</nav>
		</div>
	);
};
