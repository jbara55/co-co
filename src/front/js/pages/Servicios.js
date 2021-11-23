import React from "react";
import { InfoSection } from "../component/InfoSection";
import { InfoData, InfoDataTwo } from "../component/data/infoData";

export const Servicios = () => {
	return (
		<div>
			<InfoSection {...InfoData} />
			<InfoSection {...InfoDataTwo} />
		</div>
	);
};
