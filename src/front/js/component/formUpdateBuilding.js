import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const FormUpdateBuilding = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();
	const [building, setbuilding] = useState(null);
	useEffect(() => {
		//actions.getedificio();

		if (store.edificio.length > 0) {
			console.log("paso");
			const edif = store.edificio.find(building => building.id_building == id);
			setbuilding(edif);
			console.log(edif);
			setNameBuilding(edif.name);
			setAddress(edif.adress);
			setRegion(edif.region);
			setComuna(edif.comuna);
		}
	}, []);
	// Hooks Building//
	const [NameBuilding, setNameBuilding] = useState("");
	const [Address, setAddress] = useState("");
	const [Region, setRegion] = useState("");
	const [Comuna, setComuna] = useState("");
	//Hooks Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handlerOnclick = e => {
		e.preventDefault();
		console.log(e);
		actions.actualizarEdificio(id, NameBuilding, Address, Region, Comuna);
	};
	return (
		<Card.Body>
			<Form onSubmit={handlerOnclick}>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Nombre del Edificio:</Form.Label>
					<Form.Control
						type="text"
						required
						//placeholder="Coloque el Nombre del Edificio"
						onChange={e => setNameBuilding(e.target.value)}
						value={NameBuilding}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Direccion del Edificio:</Form.Label>
					<Form.Control
						type="text"
						required
						//placeholder="Coloque la Dirección"
						onChange={e => setAddress(e.target.value)}
						value={Address}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Region:</Form.Label>
					<Form.Control
						type="text"
						required
						//placeholder="Coloque la Región"
						onChange={e => setRegion(e.target.value)}
						value={Region}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Comuna:</Form.Label>
					<Form.Control
						type="text"
						required
						//placeholder="Coloque la Comuna"
						onChange={e => setComuna(e.target.value)}
						value={Comuna}
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
