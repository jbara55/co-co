import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as ImIcons from "react-icons/im";

export const SidebarAdminData = [
	{
		title: "Registrar Edificio",
		path: "/admin",
		icon: <FaIcons.FaBuilding />,
		cName: "nav-text1"
	},
	{
		title: "Registro Departamento",
		path: "/registrodepartamento",
		icon: <FaIcons.FaDoorClosed />,
		cName: "nav-text1"
	},
	{
		title: "Registro Espacios Comunes",
		path: "/registroecomunes",
		icon: <IoIcons.IoMdPeople />,
		cName: "nav-text1"
	},
	{
		title: "Diario Mural",
		path: "/diariomuraladmin",
		icon: <BsIcons.BsClipboardData />,
		cName: "nav-text1"
	},
	{
		title: "Listas Usuarios Registrados",
		path: "/listausuarios",
		icon: <BsIcons.BsClipboardData />,
		cName: "nav-text1"
	}
	// {
	// 	title: "Mensaje a Usuario ",
	// 	path: "/mensajeusuario",
	// 	icon: <FaIcons.FaEnvelopeOpenText />,
	// 	cName: "nav-text1"
	// },
	// {
	// 	title: "Salir sesión",
	// 	path: "/",
	// 	icon: <ImIcons.ImExit />,
	// 	cName: "nav-text1"
	// }
];
