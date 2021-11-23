import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Accordion, Card, Form, Button, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const AccordionForm = () => {
	const { store, actions } = useContext(Context);
	// Para registrarse
	const [data, setData] = useState();
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState();
	//Para iniciar session
	//podriamos usar los mismos hooks?
	const [emailLogin, setEmailLogin] = useState("");
	const [passLogin, setPassLogin] = useState("");

	useEffect(
		() => {
			// console.log(data);
			// console.log(login);
			actions.userRegister(data);
		},
		[data]
	);
	const handlerOnclick = e => {
		e.preventDefault();
		actions.loginUser(emailLogin, passLogin);
	};

	return (
		<Accordion>
			<Form className="registryForm" onSubmit={handlerOnclick}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={e => {
							setEmailLogin(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={e => {
							setPassLogin(e.target.value);
						}}
					/>
				</Form.Group>
				<Link to="/logged" className="btn btn-primary my-3" type="submit">
					Ingresar
				</Link>
			</Form>
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
						Crear Cuenta Residente
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="0">
					<Card.Body>
						<Form>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Correo Electronico</Form.Label>
									<Form.Control
										type="email"
										placeholder="correo@dominio.cl"
										onChange={e => {
											setEmail(e.target.value);
										}}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Contraseña</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										onChange={e => {
											setPass(e.target.value);
										}}
									/>
								</Form.Group>
							</Form.Row>

							<Form.Group controlId="formGridName">
								<Form.Label>Nombre Completo</Form.Label>
								<Form.Control
									placeholder="p. ej. Juan Pablo Gomez Lopez"
									onChange={e => {
										setName(e.target.value);
									}}
								/>
							</Form.Group>

							<Form.Row>
								<Form.Group controlId="formGridApartment">
									<Form.Label>Departamento</Form.Label>
									<Form.Control placeholder="101" />
								</Form.Group>
								<Form.Group controlId="formGridTower">
									<Form.Label>Torre</Form.Label>
									<Form.Control placeholder="A o B" />
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridPhone">
									<Form.Label>Telefono</Form.Label>
									<Form.Control
										placeholder="+569..."
										onChange={e => {
											setPhone(parseInt(e.target.value));
										}}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="Storage">
									<Form.Label>Bodega</Form.Label>
									<Form.Control placeholder="A101, B102" />
								</Form.Group>
								<Form.Group as={Col} controlId="Parking">
									<Form.Label>Estacionamiento</Form.Label>
									<Form.Control placeholder="A101, B102" />
								</Form.Group>
							</Form.Row>
							<Button
								variant="primary"
								onClick={e => {
									setData({
										full_name: name,
										email: email,
										password: pass,
										phone: phone
									});
								}}>
								Registrarse
							</Button>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
						Crear Cuenta Administrador
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="1">
					<Card.Body>
						<Form>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail2">
									<Form.Label>Correo Electronico</Form.Label>
									<Form.Control type="email" placeholder="correo@dominio.cl" />
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword2">
									<Form.Label>Contraseña</Form.Label>
									<Form.Control type="password" placeholder="Password" />
								</Form.Group>
							</Form.Row>

							<Form.Group controlId="formGridName2">
								<Form.Label>Nombre Completo</Form.Label>
								<Form.Control placeholder="p. ej. Juan Pablo Gomez Lopez" />
							</Form.Group>

							<Form.Row>
								<Form.Group as={Col} controlId="Telephone2">
									<Form.Label>Telefono</Form.Label>
									<Form.Control placeholder="+569..." />
								</Form.Group>
							</Form.Row>
							<Button variant="primary" type="submit">
								Registrarse
							</Button>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};
