import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export const FormUpdatMarketplace = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();
	const [MarketPlace, setMarketPlace] = useState(null);

	//Hooks Marketplace
	const [Titulo, setTitulo] = useState("");
	const [Anuncio, setAnuncio] = useState("");

	//Hooks Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (store.marketplace.length > 0) {
			console.log("paso MarketPlace");
			const Market = store.marketplace.find(MarketPlace => MarketPlace.id_marketplace == id);
			setMarketPlace(Market);
			console.log(Market);
			setTitulo(Market.title_announcement);
			setAnuncio(Market.announcement);
		}
	}, []);

	const handlerOnclickMarketplace = e => {
		e.preventDefault();
		actions.actualizarMarketplace(id, Titulo, Anuncio);
	};
	return (
		<Card.Body>
			<Form onSubmit={handlerOnclickMarketplace}>
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
					<Form.Control type="text" onChange={e => setAnuncio(e.target.value)} value={Anuncio} />
				</Form.Group>
				<Button ClassName="btn btn-primary" size="sm" type="submit" onClick={handleShow}>
					Actualizar
				</Button>{" "}
				<Link to={"/marketplace"}>
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
