import React, { useEffect, useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Context } from "../store/appContext";

export const CardMarketplace = () => {
	const { store, actions } = useContext(Context);
	useEffect(
		() => {
			actions.getmarketplace();
		},
		[store.marketplace]
	);
	return (
		<Row xs={12} md={8} className="g-4">
			{store.marketplace.map((elemento, posicion) => {
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
