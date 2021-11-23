import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as ImIcons from "react-icons/im";

export const SidebarUserData = [
	{
		title: "Inicio",
		path: "/inicio",
		icon: <AiIcons.AiFillHome />,
		cName: "nav-text"
	},
	{
		title: "Mensajes",
		path: "/mensajes",
		icon: <FaIcons.FaEnvelopeOpenText />,
		cName: "nav-text"
	},
	{
		title: "MarketPlace",
		path: "/marketplace",
		icon: <FaIcons.FaCartPlus />,
		cName: "nav-text"
	},
	{
		title: "Publicaciones MarketPlace",
		path: "/vistamarket",
		icon: <FaIcons.FaSearchDollar />,
		cName: "nav-text"
	}
	// {

	// 	title: "Salir Sesión",
	// 	path: "/",
	// 	icon: <ImIcons.ImExit />,
	// 	cName: "nav-text"
	// }
];
