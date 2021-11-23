import React from "react";
import { CardGroup } from "react-bootstrap";
import { CardMural } from "../component/cardMural";
import "../../styles/mural.scss";

export const DiarioMural = () => {
	return (
		<div>
			<h1 className="Muralplaceheader">Diario Mural</h1>
			<CardGroup className="containermural row">
				<CardMural />
			</CardGroup>
		</div>
	);
};
