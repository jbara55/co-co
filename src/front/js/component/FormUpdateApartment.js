import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export const FormUpdateApartment = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();
	const [apartment, setApartment] = useState(null);
	//   Hooks Apartment
	const [NumApartment, setNumApartment] = useState("");
	const [FloorApartment, setFloorApartment] = useState("");

	useEffect(() => {
		if (store.departamento.length > 0) {
			console.log("paso apartment");
			const dpto = store.departamento.find(apartment => apartment.id_apartment == id);
			setApartment(dpto);
			console.log(dpto);
			setNumApartment(dpto.num_apartment);
			setFloorApartment(dpto.floor_apartment);
		}
	}, []);
	//Hooks Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handlerOnclickDpto = e => {
		e.preventDefault();
		actions.actualizarApartamento(id, NumApartment, FloorApartment);
	};
	return (
		<Card.Body>
			<Form onSubmit={handlerOnclickDpto}>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Numero del Departamento:</Form.Label>
					<Form.Control
						type="text"
						required
						//placeholder="Coloque el Nombre del Edificio"
						onChange={e => setNumApartment(e.target.value)}
						value={NumApartment}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Piso del Departamento:</Form.Label>
					<Form.Control
						type="text"
						required
						//placeholder="Coloque la Dirección"
						onChange={e => setFloorApartment(e.target.value)}
						value={FloorApartment}
					/>
				</Form.Group>
				<Button ClassName="btn btn-primary" size="sm" type="submit" onClick={handleShow}>
					Actualizar
				</Button>{" "}
				<Link to={"/admin"}>
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
