import React, { useContext } from "react";
import { Acordeonlogged } from "../component/acordeonlogged";
import { Container, Row } from "react-bootstrap";
import "../../styles/registry.scss";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { Context } from "../store/appContext";
import acceso from "../../img/noacceso.png";

export const LoggedScreen = () => {
	const { store, actions } = useContext(Context);
	return (
		<>
			{localStorage.getItem("token") != null ? (
				<>
					<Acordeonlogged />
				</>
			) : (
				<>
					<br />
					<br />
					<br />
					<br />
					<br />
					<div>
						<h1 className="permiso">Debes registrarte para ingresar a nuestra página</h1>
					</div>
					<div>
						<img className="acceso" src={acceso} alt="fotoAcceso" />
					</div>
				</>
			)}
		</>
	);
};
