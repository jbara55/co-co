import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export const FormUpdateDiarioMural = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();
	const [DiarioMural, setDiarioMural] = useState(null);
	//Hooks DiarioMural
	const [Titulo, setTitulo] = useState("");
	const [Anuncio, setAnuncio] = useState("");

	useEffect(() => {
		if (store.diario_mural.length > 0) {
			console.log("paso DiarioMural");
			const DM = store.diario_mural.find(DiarioMural => DiarioMural.id_diariomural == id);
			setDiarioMural(DM);
			console.log(DM);
			setTitulo(DM.title_announcement);
			setAnuncio(DM.announcement);
		}
	}, []);
	//Hooks Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handlerOnclickDiarioMural = e => {
		e.preventDefault();
		actions.actualizarDiarioMural(id, Titulo, Anuncio);
	};

	return (
		<Card.Body>
			<Form onSubmit={handlerOnclickDiarioMural}>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label> Titulo del Anuncio:</Form.Label>
					<Form.Control
						type="text"
						required
						//placeholder="Coloque el Nombre del Edificio"
						onChange={e => setTitulo(e.target.value)}
						value={Titulo}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Anuncio:</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="Coloque el anuncio a mostrar en el diario mural"
						onChange={e => setAnuncio(e.target.value)}
						value={Anuncio}
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
