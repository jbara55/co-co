import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Accordion, Container, Modal, Table, Tabs, Tab, Button, Card, Form, Col } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const UsuariosRegistrados = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getUserRegistrado();
	}, []);

	//Hooks Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//Hooks Usuario Registrado
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [dpto, setDpto] = useState("");

	return (
		<div>
			<Card className="my-5 container">
				<Card.Header>Listados</Card.Header>
				<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
					<Tab eventKey="profile" title="Usuarios">
						<Card.Body>
							<Table striped bordered hover size="sm">
								<thead>
									<tr>
										<th />
										<th>Id</th>
										<th>Nombre</th>
										<th>Telefono</th>
										<th>Email</th>
										<th>Numero de Apartamento</th>
									</tr>
								</thead>
								<tbody>
									{store.usuarios.map((elemento, posicion) => {
										return (
											<tr key={posicion}>
												<td className="col-md-1">
													<Button
														className="btn btn-info"
														size="sm"
														type="button"
														onClick={() => {
															actions.borrarUsuarioRegistrado(elemento);
														}}>
														<i className="fas fa-trash-alt"> </i>
													</Button>{" "}
													<Link to={"/actualizar_usuario/" + elemento.id_user}>
														<Button className="btn btn-info" size="sm" type="button">
															<i className="fas fa-edit" />
														</Button>
													</Link>
													{""}
												</td>
												<td>{elemento.id_user}</td>
												<td> {elemento.full_name}</td>
												<td>{elemento.phone}</td>
												<td>{elemento.email}</td>
												<td>{elemento.numero_apartment}</td>
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
