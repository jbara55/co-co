import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export const FormUpdatUsuariosRegistrado = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();
	const [usuariosReg, setUsuariosReg] = useState(null);

	//Hooks Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//Hooks Usuario Registrado
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [dpto, setDpto] = useState("");

	useEffect(() => {
		if (store.usuarios.length > 0) {
			const Ureg = store.usuarios.find(usuariosReg => usuariosReg.id_user == id);
			setUsuariosReg(Ureg);
			setName(Ureg.full_name);
			setPhone(Ureg.phone);
			setEmail(Ureg.email);
			setDpto(Ureg.numero_apartment);
		}
	}, []);

	const handlerOnclickUsuariosRegistrados = e => {
		e.preventDefault();
		actions.actualizarUsuarioregistrado(id, name, phone, email, dpto);
	};
	return (
		<Card.Body>
			<Form onSubmit={handlerOnclickUsuariosRegistrados}>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label> Nombre:</Form.Label>
					<Form.Control
						type="text"
						//placeholder="Coloque el Nombre del Edificio"
						onChange={e => setName(e.target.value)}
						value={name}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Telefono:</Form.Label>
					<Form.Control type="text" onChange={e => setPhone(e.target.value)} value={phone} />
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>email:</Form.Label>
					<Form.Control type="text" onChange={e => setEmail(e.target.value)} value={email} />
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Numero de Departamento:</Form.Label>
					<Form.Control type="text" onChange={e => setDpto(e.target.value)} value={dpto} />
				</Form.Group>
				<Button ClassName="btn btn-primary" size="sm" type="submit" onClick={handleShow}>
					Actualizar
				</Button>{" "}
				<Link to={"/listausuarios"}>
					<Button variant="success" size="sm" type="submit" onClick={handleShow}>
						Volver
					</Button>
				</Link>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Enhorabuena!</Modal.Title>
					</Modal.Header>
					<Modal.Body> Registro Actualizado...</Modal.Body>
					<Modal.Footer>
						<Button variant="info" size="sm" onClick={handleClose}>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>
			</Form>
		</Card.Body>
	);
};
