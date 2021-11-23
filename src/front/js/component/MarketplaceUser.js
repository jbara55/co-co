import React, { useState, useEffect, useContext } from "react";
import { Accordion, Container, Modal, Tabs, Table, Tab, Button, Card, Form, Col } from "react-bootstrap";
import { Context } from "../store/appContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const MarketplaceUser = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getmarketplace();
		console.log("paso Acordeonlogged");
	}, []);
	console.log(store.marketplace);
	//Hooks Marketplace
	const [Titulo, setTitulo] = useState("");
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
		actions.registrarmarketplace(Titulo, Anuncio);
	};
	const handlerOnclickEnviarCorreoAdmin = e => {
		e.preventDefault();
		//actions.enviaremail(name, email, text);
	};
	return (
		<div>
			<Card className="my-5 container">
				<Card.Header>MarketPlace</Card.Header>
				<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
					<Tab eventKey="home" title="Registrar">
						<Card.Body>
							<Form onSubmit={handlerOnclickMarketplace}>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>Titulo </Form.Label>
									<Form.Control
										type="text"
										placeholder="Coloque el titulo del anuncio"
										onChange={e => setTitulo(e.target.value)}
										value={Titulo}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>Anuncio:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Coloque el anuncio a mostrar en el diario mural"
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
										<th className="col-md-1" />
										<th>Id</th>
										<th>Titulo</th>
										<th>Anuncio</th>
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
												<td>{elemento.announcement}</td>{" "}
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Card.Body>
					</Tab>
				</Tabs>
			</Card>
		</div>
	);
};
