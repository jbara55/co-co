import React, { useEffect, useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Context } from "../store/appContext";

export const CardMural = () => {
	const { store, actions } = useContext(Context);
	useEffect(
		() => {
			actions.getdiariomural();
		},
		[store.diario_mural]
	);

	return (
		<Row xs={12} md={8} className="g-4">
			{store.diario_mural.map((elemento, posicion) => {
				return (
					<Col key={posicion}>
						<Card className="mx-3 my-3" bg={"secondary"} style={{ width: "18rem" }} text={"light"}>
							<Card.Header>{elemento.title_announcement}</Card.Header>
							<Card.Body>
								<Card.Text>{elemento.announcement}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
};
