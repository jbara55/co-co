import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarAdminData } from "../data/SidebarAdminData";
import "./SidebarAdmin.css";
import { IconContext } from "react-icons";
import Edi from "../../../img/logo.png";
import * as ImIcons from "react-icons/im";
import { Context } from "../../store/appContext";
import acceso from "../../../img/noacceso.png";

export const SidebarAdmin = () => {
	const { store, actions } = useContext(Context);
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);
	return (
		<div>
			<IconContext.Provider value={{ color: "#fff" }}>
				<div className="navbar1">
					<Link to="#" className="menu-bars1">
						<FaIcons.FaBars onClick={showSidebar} />
					</Link>
				</div>

				<nav className={sidebar ? "nav-menu1 active" : "nav-menu1"}>
					<ul className="nav-menu-items1" onClick={showSidebar}>
						<li className="navbar-toggle1">
							<Link to="#" className="menu-bars1">
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						<div>
							<img className="logo__user1" src={Edi} height="120px" width="120px" />
						</div>
						{SidebarAdminData.map((item, index) => {
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
							<a href="/" onClick={actions.clearToken_admin}>
								<ImIcons.ImExit /> <span>Salir Sesion</span>
							</a>
						</li>
					</ul>
				</nav>
			</IconContext.Provider>
		</div>
	);
};
