import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useState, useEffect } from "react";
import photosign from "../../../img/edificio-regitro-small.jpeg";
import photosignup from "../../../img/edificio-login-user.jpeg";
import "./LogSign.css";
import { Link } from "react-router-dom";

export const LogSign = () => {
	const { store, actions } = useContext(Context);

	const [click, setClick] = useState("false");
	const [data, setData] = useState();
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState();
	const [numeroApartment, setNumeroApartment] = useState();
	//Para iniciar session
	//podriamos usar los mismos hooks?
	const [emailLogin, setEmailLogin] = useState("");
	const [passLogin, setPassLogin] = useState("");

	const toggleFormRegister = e => {
		setClick(!click);
	};
	const handlerOnclick = e => {
		if (emailLogin == "" || passLogin == "") {
			alert("Verifique sus datos por favor");
		} else {
			e.preventDefault();
			actions.loginUser(emailLogin, passLogin);
		}
	};

	const handlersubmit = e => {
		if (email == "" || pass == "" || phone == "" || name == "") {
			alert("Ingrese todos los datos por favor");
		} else {
			e.preventDefault();
			actions.userRegister(email, pass, phone, name);
		}
	};

	return (
		<section className="logsign">
			<div className={click ? "container" : "container active"}>
				<div className="user signinBx">
					<div className="imgBx">
						<img className="photosign" src={photosign} width="500px" height="750px" />
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
								href="/logged/"
								className="btn btn-info"
								type="submit"
								name=""
								value="Enviar"
								onClick={handlerOnclick}>
								Enviar
							</button>

							<p className="signup">
								¿No tienes una cuenta?{" "}
								<a
									href="#"
									onClick={e => {
										toggleFormRegister();
									}}>
									Registrate
								</a>
							</p>
						</form>
					</div>
				</div>
				<div className="user signupBx">
					<div className="formBx">
						<form onSubmit={e => handlersubmit(e)}>
							<h2>Crea una cuenta</h2>
							<input
								type="email"
								name=""
								placeholder="Email"
								required
								onChange={e => {
									setEmail(e.target.value);
								}}
							/>
							<input
								type="password"
								name=""
								placeholder="Password"
								required
								onChange={e => {
									setPass(e.target.value);
								}}
							/>
							<input
								type="text"
								name=""
								placeholder="Nombre Completo"
								required
								onChange={e => {
									setName(e.target.value);
								}}
							/>
							<input
								type="text"
								name=""
								placeholder="Departamento"
								required
								onChange={e => {
									setNumeroApartment(parseInt(e.target.value));
								}}
							/>

							<input
								type="text"
								name=""
								placeholder="Telefono 56..."
								required
								onChange={e => {
									setPhone(parseInt(e.target.value));
								}}
							/>
							{/* <input type="text" name="" placeholder="Numero bodega" />
							<input type="text" name="" placeholder="Numero estacionamiento" /> */}
							<input type="submit" name="ingresar" value="Registrar" onSubmit={e => handlersubmit(e)} />
							<p className="signup">
								¿ya tienes una cuenta?{" "}
								<a href="#" onClick={e => toggleFormRegister()}>
									Ingresa
								</a>
							</p>
						</form>
					</div>
					<div className="imgBx">
						<img className="photosign" src={photosignup} width="500px" height="750px" />
					</div>
					<div>
						<h1 />
					</div>
				</div>
			</div>
		</section>
	);
};
