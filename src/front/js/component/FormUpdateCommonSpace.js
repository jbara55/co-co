import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export const FormUpdateCommonSpace = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();
	const [EspacioComun, setEspacioComun] = useState(null);
	// Hooks CommonSpace
	const [CommonSpace, setCommonSpace] = useState("");
	const [Aforo, setAforo] = useState("");

	useEffect(() => {
		if (store.espacio_comun.length > 0) {
			console.log("paso CommonSpace");
			const EspComun = store.espacio_comun.find(EspacioComun => EspacioComun.id_commonspace == id);
			setEspacioComun(EspComun);
			console.log(EspComun);
			setCommonSpace(EspComun.name);
			setAforo(EspComun.aforo);
		}
	}, []);

	//Hooks Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handlerOnclickEspComun = e => {
		e.preventDefault();
		actions.actualizarEspaciosComunes(id, CommonSpace, Aforo);
	};
	return (
		<Card.Body>
			<Form onSubmit={handlerOnclickEspComun}>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Espacio Comun:</Form.Label>
					<Form.Control
						type="text"
						required
						//placeholder="Coloque el Nombre del Edificio"
						onChange={e => setCommonSpace(e.target.value)}
						value={CommonSpace}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Aforo:</Form.Label>
					<Form.Control
						type="text"
						required
						//placeholder="Coloque la Dirección"
						onChange={e => setAforo(e.target.value)}
						value={Aforo}
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
