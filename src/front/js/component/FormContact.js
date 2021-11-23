import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Icon } from "@iconify/react";
import "../../styles/contact.scss";

export const FormContact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [text, setText] = useState("");
	const { store, actions } = useContext(Context);

	const handlerOnclick = e => {
		e.preventDefault();

		actions.enviaremail(name, email, text);
		// aqui debeir el actions enviar email y con la variable form actions.enviaremail(form)
	};

	return (
		<>
			<Container>
				<Row className="contact">
					<Col md={6}>
						<Col md={12} className="info-box">
							<h3>Nuestra Dirección</h3>
							<Icon icon="bx:bx-map" color="#5c7aea" width="52" height="52" />
						</Col>
						<Row>
							<Col md={6} className="info-box">
								<Icon icon="bx:bx-envelope" color="#5c7aea" width="52" height="52" />
								<h3 className="d-inline">Escríbenos</h3>
								<p>appedificio@gmail.com</p>
							</Col>
							<Col md={6} className="info-box">
								<Icon icon="bx:bx-phone" color="#5c7aea" width="52" height="52" />
								<h3 className="d-inline">Contáctanos</h3>
								<p>+56 222 232 233</p>
							</Col>
						</Row>
					</Col>
					<Col md={6}>
						<Form onSubmit={handlerOnclick}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Nombre:</Form.Label>
								<Form.Control
									type="text"
									placeholder="Escriba su Nombre"
									required
									onChange={e => setName(e.target.value)}
									value={name}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="email@ejemplo.com"
									required
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
									required
									onChange={e => setText(e.target.value)}
									value={text}
								/>
							</Form.Group>
							<Button ClassName="btn btn-primary" type="submit">
								Enviar Mensaje
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};
