import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useState, useEffect } from "react";
import loginadminphoto from "../../../img/loginadmin2.jpeg";
import "./LoginAdmin.css";

export const LoginAdmin = () => {
	const { store, actions } = useContext(Context);
	const [emailLogin, setEmailLogin] = useState("");
	const [passLogin, setPassLogin] = useState("");

	const handlerOnclick = e => {
		if (emailLogin == "" || passLogin == "") {
			alert("Verifique sus datos por favor");
		} else {
			e.preventDefault();
			actions.loginAdmin(emailLogin, passLogin);
		}
	};
	return (
		<section>
			<div className="container">
				<div className="user signinBx">
					<div className="imgBx">
						<div className="copy">
							<h1>Bienvenido</h1>
							<p>Administrador</p>
						</div>
						<img className="photosign" alt="#" src={loginadminphoto} width="500px" height="750px" />
					</div>
					<div className="formBx">
						<form onSubmit={e => handlerOnclick(e)}>
							<h2>Inicia Sesión</h2>
							<input
								type="email"
								name=""
								placeholder="Email"
								required
								onChange={e => {
									setEmailLogin(e.target.value);
								}}
							/>

							<input
								type="password"
								name=""
								placeholder="Password"
								required
								onChange={e => {
									setPassLogin(e.target.value);
								}}
							/>

							<button
								href="/admin"
								className="btn btn-info"
								type="submit"
								name=""
								value="Enviar"
								onClick={handlerOnclick}>
								Enviar
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
