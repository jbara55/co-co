import React, { useState, useEffect, useContext } from "react";
import { Accordion, Container, Modal, Tabs, Table, Tab, Button, Card, Form, Col } from "react-bootstrap";
import { Context } from "../store/appContext";
//import { DateP } from "./datepicker";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Acordeonlogged = () => {
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
		//actions.enviaremail(name, email, text);
	};
	return (
		<Accordion className="datepicker my-0">
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
						MarketPlace
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="0">
					<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
						<Tab eventKey="home" title="Registrar">
							<Card.Body>
								<Form onSubmit={handlerOnclickMarketplace}>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Titulo </Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque el titulo del anuncio"
											required
											onChange={e => setTitulo(e.target.value)}
											value={Titulo}

											required
							

										/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Tipo de Publicacion:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque el tipo publicacion"
											required
											onChange={e => setPublicacion(e.target.value)}
											value={TipoPublicacion}
										/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Anuncio:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque el anuncio a mostrar en el diario mural"
											required
											onChange={e => setAnuncio(e.target.value)}
											value={Anuncio}
										/>
									</Form.Group>
									<Button ClassName="btn btn-primary" size="sm" type="submit" onClick={handleShow}>
										Registro de MarketPlace
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
						</Tab>
						<Tab eventKey="profile" title="Listar ">
							<Card.Body>
								<Table striped bordered hover size="sm">
									<thead>
										<tr>
											<th />

											<th>Id</th>
											<th>Titulo</th>
											<th>Anuncio</th>
											<th>tipo de publicacion</th>
										</tr>
									</thead>
									<tbody>
										{store.marketplace.map((elemento, posicion) => {
											return (
												<tr key={posicion}>
													<td className="col-md-1">
														<Button
															className="btn btn-info"
															size="sm"
															type="button"
															onClick={() => {
																actions.borrarMarketPlace(elemento);
															}}>
															<i className="fas fa-trash-alt"> </i>
														</Button>{" "}
														<Link to={"/actualizar_marketplace/" + elemento.id_marketplace}>
															<Button className="btn btn-info" size="sm" type="button">
																<i className="fas fa-edit" />
															</Button>
														</Link>
														{""}
													</td>
													<td>{elemento.id_marketplace}</td>
													<td> {elemento.title_announcement}</td>
													<td>{elemento.announcement}</td>
													<td>{elemento.type_publication}</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</Card.Body>
						</Tab>
					</Tabs>
				</Accordion.Collapse>
			</Card>
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
						Mensaje a Administrador
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="1">
					<Card.Body>
						<Form onSubmit={handlerOnclickEnviarCorreoAdmin}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Nombre:</Form.Label>
								<Form.Control
									type="text"
									placeholder="Escriba su Nombre"
									onChange={e => setName(e.target.value)}
									value={name}
									required 
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
				</Accordion.Collapse>
			</Card>
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
						Reserva de Espacios Comunes
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="2">
					<Card.Body style={{ height: "400px" }}>
						<Form>
							<DateP />

							<button /* onClick={actions.reservaEsopacio(espacio, date)}*/>Reservar</button>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};
