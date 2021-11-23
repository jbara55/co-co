import React, { useState, useEffect, useContext } from "react";
import { Accordion, Container, Modal, Tabs, Table, Tab, Button, Card, Form, Col } from "react-bootstrap";
import { Context } from "../store/appContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const MensajeAdmin = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getmarketplace();
		console.log("paso Acordeonlogged");
	}, []);
	console.log(store.marketplace);
	//Hooks Marketplace
	const [Titulo, setTitulo] = useState("");
	const [TipoPublicacion, setPublicacion] = useState("");
	const [Anuncio, setAnuncio] = useState("");

	//Hooks Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//Hooks Modal Correo Enviado

	//Hooks Enviar Datos admin
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [text, setText] = useState("");

	const handlerOnclickMarketplace = e => {
		e.preventDefault();
		actions.registrarmarketplace(Titulo, TipoPublicacion, Anuncio);
	};
	const handlerOnclickEnviarCorreoAdmin = e => {
		e.preventDefault();
		actions.enviaremail(name, email, text);
	};
	return (
		<div>
			<Card className="my-5 container">
				<Card.Header>Mensaje a Administrador</Card.Header>
				<Card.Body>
					<Form onSubmit={handlerOnclickEnviarCorreoAdmin}>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Nombre:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Escriba su Nombre"
								onChange={e => setName(e.target.value)}
								value={name}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="email@ejemplo.com"
								onChange={e => setEmail(e.target.value)}
								value={email}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Escriba su Mensaje</Form.Label>
							<Form.Control
								as="textarea"
								placeholder="Su Mensaje"
								rows={5}
								onChange={e => setText(e.target.value)}
								value={text}
							/>
						</Form.Group>
						<Button ClassName="btn btn-primary" type="submit" onClick={handleShow}>
							Enviar Mensaje
						</Button>
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Enhorabuena!</Modal.Title>
							</Modal.Header>
							<Modal.Body>Registro Exitoso...</Modal.Body>
							<Modal.Footer>
								<Button variant="info" size="sm" onClick={handleClose}>
									Cerrar
								</Button>
							</Modal.Footer>
						</Modal>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};
