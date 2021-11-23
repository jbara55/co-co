import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Accordion, Container, Modal, Tabs, Table, Tab, Button, Card, Form, Col } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const AdminAcordeon = () => {
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
	const [TipoPublicacion, setPublicacion] = useState("");
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
		actions.registrardiariomural(Titulo, TipoPublicacion, Anuncio);
	};

	return (
		<Accordion defaultActiveKey="0">
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Card.Header} eventKey="0">
						Registro De Edificio
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="0">
					<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
						<Tab eventKey="home" title="Registrar">
							<Card.Body>
								<Form onSubmit={handlerOnclick}>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Nombre del Edificio:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque el Nombre del Edificio"
											required
											onChange={e => setNameBuilding(e.target.value)}
											value={NameBuilding}
										/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Direccion del Edificio:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque la Dirección"
											required
											onChange={e => setAddress(e.target.value)}
											value={Address}
										/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Region:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque la Región"
											required
											onChange={e => setRegion(e.target.value)}
											value={Region}
										/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Comuna:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque la Comuna"
											required
											onChange={e => setComuna(e.target.value)}
											value={Comuna}
										/>
									</Form.Group>
									<Button ClassName="btn btn-primary" size="sm" type="submit" onClick={handleShow}>
										Registrar Edificio
									</Button>
									<Modal show={show} onHide={handleClose}>
										<Modal.Header closeButton>
											<Modal.Title>Enhorabuena!</Modal.Title>
										</Modal.Header>
										<Modal.Body> Registro Exitoso...</Modal.Body>
										<Modal.Footer>
											<Button variant="info" size="sm" onClick={handleClose}>
												Cerrar
											</Button>
										</Modal.Footer>
									</Modal>
								</Form>
							</Card.Body>
						</Tab>
						<Tab eventKey="profile" title="Listar Edificio">
							<Card.Body>
								<Table striped bordered hover size="sm">
									<thead>
										<tr>
											<th />
											<th>Id</th>
											<th>Nombre</th>
											<th>Direccion</th>
											<th>Region</th>
											<th>Comuna</th>
										</tr>
									</thead>
									<tbody>
										{store.edificio.map((elemento, posicion) => {
											return (
												<tr key={posicion}>
													<td className="col-md-1">
														<Button
															className="btn btn-info"
															size="sm"
															type="button"
															onClick={() => {
																actions.borrarEdificio(elemento);
																console.log("hola borrar edificio");
															}}>
															<i className="fas fa-trash-alt"> </i>
														</Button>{" "}
														<Link to={"/actualizar_edificio/" + elemento.id_building}>
															<Button className="btn btn-info" size="sm" type="button">
																<i className="fas fa-edit" />
															</Button>
														</Link>
														{""}
													</td>
													<td>{elemento.id_building}</td>
													<td> {elemento.name}</td>
													<td>{elemento.adress}</td>
													<td>{elemento.region}</td>
													<td>{elemento.comuna}</td>
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
					<Accordion.Toggle as={Card.Header} eventKey="1">
						Registro de Departamento
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="1">
					<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
						<Tab eventKey="home" title="Registrar">
							<Card.Body>
								<Form onSubmit={handlerOnclickDpto}>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Numero de Departamento</Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque el Numero de Dpto"
											onChange={e => setNumApartment(e.target.value)}
											value={NumApartment}
										/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Piso:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque el piso"
											onChange={e => setFloorApartment(e.target.value)}
											value={FloorApartment}
										/>
									</Form.Group>
									<Button ClassName="btn btn-primary" size="sm" type="submit" onClick={handleShow}>
										Registrar Depto
									</Button>
									<Modal show={show} onHide={handleClose}>
										<Modal.Header closeButton>
											<Modal.Title>Enhorabuena!</Modal.Title>
										</Modal.Header>
										<Modal.Body> Registro Exitoso...</Modal.Body>
										<Modal.Footer>
											<Button variant="info" size="sm" onClick={handleClose}>
												Cerrar
											</Button>
										</Modal.Footer>
									</Modal>
								</Form>
							</Card.Body>
						</Tab>
						<Tab eventKey="profile" title="Listar Departamento">
							<Card.Body>
								<Table striped bordered hover size="sm">
									<thead>
										<tr>
											<th />
											<th>Id</th>
											<th>Numero Depto</th>
											<th>Piso</th>
										</tr>
									</thead>
									<tbody>
										{store.departamento.map((elemento, posicion) => {
											return (
												<tr key={posicion}>
													<td className="col-md-1">
														<Button
															className="btn btn-info"
															size="sm"
															type="button"
															onClick={() => {
																actions.borrarApartamento(elemento);
															}}>
															<i className="fas fa-trash-alt"> </i>
														</Button>{" "}
														<Link to={"/actualizar_apartamento/" + elemento.id_apartment}>
															<Button className="btn btn-info" size="sm" type="button">
																<i className="fas fa-edit" />
															</Button>
														</Link>
														{""}
													</td>
													<td>{elemento.id_apartment}</td>
													<td> {elemento.num_apartment}</td>
													<td>{elemento.floor_apartment}</td>
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
					<Accordion.Toggle as={Card.Header} eventKey="2">
						Registro de Espacios Comunes
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="2">
					<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
						<Tab eventKey="home" title="Registrar">
							<Card.Body>
								<Form onSubmit={handlerOnclickEspComun}>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Espacio Comun </Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque el Nombre del Espacio Comun"
											onChange={e => setCommonSpace(e.target.value)}
											value={CommonSpace}
										/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Aforo:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque el aforo"
											onChange={e => setAforo(e.target.value)}
											value={Aforo}
										/>
									</Form.Group>
									<Button ClassName="btn btn-primary" size="sm" type="submit" onClick={handleShow}>
										Registrar Espacio Comun
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
						<Tab eventKey="profile" title="Listar Espacios Comunes">
							<Card.Body>
								<Table striped bordered hover size="sm">
									<thead>
										<tr>
											<th>Id</th>
											<th>Nombre</th>
											<th>Aforo</th>
										</tr>
									</thead>
									<tbody>
										{store.espacio_comun.map((elemento, posicion) => {
											return (
												<tr key={posicion}>
													<td className="col-md-1">
														<Button
															className="btn btn-info"
															size="sm"
															type="button"
															onClick={() => {
																actions.borrarEspacioComun(elemento);
															}}>
															<i className="fas fa-trash-alt"> </i>
														</Button>{" "}
														<Link
															to={"/actualizar_espaciocomun/" + elemento.id_commonspace}>
															<Button className="btn btn-info" size="sm" type="button">
																<i className="fas fa-edit" />
															</Button>
														</Link>
														{""}
													</td>
													<td>{elemento.id_commonspace}</td>
													<td> {elemento.name}</td>
													<td>{elemento.aforo}</td>
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
					<Accordion.Toggle as={Card.Header} eventKey="3">
						Registro de Diario Mural
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="3">
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
										<Form.Label>Tipo de Publicacion:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Coloque el tipo publicacion"
											onChange={e => setPublicacion(e.target.value)}
											value={TipoPublicacion}
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
											<th>Id</th>
											<th>Titulo</th>
											<th>Anuncio</th>
											<th>tipo de publicacion</th>
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
														<Link to={"/actualizar_diariomural/" + elemento.id_diariomural}>
															<Button className="btn btn-info" size="sm" type="button">
																<i className="fas fa-edit" />
															</Button>
														</Link>
														{""}
													</td>
													<td>{elemento.id_diariomural}</td>
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
		</Accordion>
	);
};
