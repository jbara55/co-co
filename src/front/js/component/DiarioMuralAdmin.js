import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Accordion, Container, Modal, Tabs, Table, Tab, Button, Card, Form, Col } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import acceso from "../../img/noacceso.png";

export const DiarioMuralAdmin = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getedificio();
		actions.getdepartamento();
		actions.getespaciocomun();
		actions.getdiariomural();
	}, []);

	//console.log(store.espacio_comun);
	// Hooks Building//
	const [NameBuilding, setNameBuilding] = useState("");
	const [Address, setAddress] = useState("");
	const [Region, setRegion] = useState("");
	const [Comuna, setComuna] = useState("");
	//   Hooks Apartment
	const [NumApartment, setNumApartment] = useState("");
	const [FloorApartment, setFloorApartment] = useState("");
	// Hooks CommonSpace
	const [CommonSpace, setCommonSpace] = useState("");
	const [Aforo, setAforo] = useState("");

	//Hooks DiarioMural
	const [Titulo, setTitulo] = useState("");
	const [Anuncio, setAnuncio] = useState("");

	//Hooks Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handlerOnclick = e => {
		e.preventDefault();
		actions.registraredificio(NameBuilding, Address, Region, Comuna);
	};
	const handlerOnclickDpto = e => {
		e.preventDefault();
		actions.registrarapartamento(NumApartment, FloorApartment);
	};
	const handlerOnclickEspComun = e => {
		e.preventDefault();
		actions.registrarespaciocomun(CommonSpace, Aforo);
	};
	const handlerOnclickDiarioMural = e => {
		e.preventDefault();
		actions.registrardiariomural(Titulo, Anuncio);
	};

	return (
		<div>
			{localStorage.getItem("token_admin") != null ? (
				<>
					<Card className="my-5 container">
						<Card.Header>Registro de Diario Mural</Card.Header>
						<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
							<Tab eventKey="home" title="Registrar">
								<Card.Body>
									<Form onSubmit={handlerOnclickDiarioMural}>
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
										<Button
											ClassName="btn btn-primary"
											size="sm"
											type="submit"
											onClick={handleShow}>
											Registro de Diario Mural
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
											</tr>
										</thead>
										<tbody>
											{store.diario_mural.map((elemento, posicion) => {
												return (
													<tr key={posicion}>
														<td className="col-md-1">
															<Button
																className="btn btn-info"
																size="sm"
																type="button"
																onClick={() => {
																	actions.borrarDiarioMural(elemento);
																}}>
																<i className="fas fa-trash-alt"> </i>
															</Button>{" "}
															<Link
																to={
																	"/actualizar_diariomural/" + elemento.id_diariomural
																}>
																<Button
																	className="btn btn-info"
																	size="sm"
																	type="button">
																	<i className="fas fa-edit" />
																</Button>
															</Link>
															{""}
														</td>
														<td>{elemento.id_diariomural}</td>
														<td> {elemento.title_announcement}</td>
														<td>{elemento.announcement}</td>
													</tr>
												);
											})}
										</tbody>
									</Table>
								</Card.Body>
							</Tab>
						</Tabs>
					</Card>
				</>
			) : (
				<>
					<h1 className="d-flex justify-content-center my-3">Debes registrarte para inicar session.</h1>
					<img className="acceso container d-flex justify-content-center" src={acceso} alt="fotoAcceso" />
				</>
			)}
		</div>
	);
};
