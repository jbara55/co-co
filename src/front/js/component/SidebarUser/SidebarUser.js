import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarUserData } from "../data/SidebarUserData";
import "./SidebarUser.css";
import { IconContext } from "react-icons";
import Edi from "../../../img/logo.png";
import * as ImIcons from "react-icons/im";
import { Context } from "../../store/appContext";

export const SidebarUser = () => {
	const { store, actions } = useContext(Context);
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);
	return (
		<>
			<div className="container__user">
				<IconContext.Provider value={{ color: "#fff" }}>
					<div className="navbar">
						<Link to="#" className="menu-bars">
							<FaIcons.FaBars onClick={showSidebar} />
						</Link>
					</div>

					<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
						<ul className="nav-menu-items" onClick={showSidebar}>
							<li className="navbar-toggle">
								<Link to="#" className="menu-bars">
									<AiIcons.AiOutlineClose />
								</Link>
							</li>
							<div>
								<img className="logo__user" src={Edi} height="120px" width="120px" />
							</div>
							{SidebarUserData.map((item, index) => {
								return (
									<li key={index} className={item.cName}>
										<Link to={item.path}>
											{item.icon}
											<span>{item.title}</span>
										</Link>
									</li>
								);
							})}
							<li className="nav-text">
								<a href="/" onClick={actions.clearToken}>
									<ImIcons.ImExit /> <span>Salir Sesion</span>
								</a>
							</li>
						</ul>
					</nav>
				</IconContext.Provider>
			</div>
		</>
	);
};
