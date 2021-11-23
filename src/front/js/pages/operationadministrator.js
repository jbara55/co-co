import React, { useContext } from "react";
import { AdminAcordeon } from "../component/adminacordeon";
import { Context } from "../store/appContext";
import acceso from "../../img/noacceso.png";

export const AdminOperation = () => {
	const { store, actions } = useContext(Context);
	return (
		<>
			{localStorage.getItem("token") != null ? (
				<>
					<AdminAcordeon />
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
