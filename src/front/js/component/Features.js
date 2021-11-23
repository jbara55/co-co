import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import FeatureOne from "/workspace/proyectoFinal/src/front/img/featureone.jpeg";

const Section = styled.section`
	background: #000d1a;
	padding: 1rem 0rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Container = styled.div`
	background: #fff;
	padding: 1rem 2rem;
	position: relative;
`;

const Wrap = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

const ColumnLeft = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 0px -15px;
	justify-content: flex-start;
	padding: 1rem;
`;

const Content = styled.div`
	flex: 0 0 50%;

	@media screen and (max-width: 768px) {
		flex: 0 0 100%;
		max-width: 100%;
		margin-top: 250px;
	}

	h1 {
		margin-bottom: 2rem;
		font-size: 2rem;
	}

	p {
		margin-bottom: 1rem;
		line-height: 1.5;
	}
`;

const ColumnRight = styled.div`
	position: absolute;
	top: -80px;
	right: 0;
	max-width: 850px;
	height: 140%;
	width: 45%;
	padding-left: 1rem;

	@media screen and (max-width: 768px) {
		height: 320px;
		top: -65px;
		width: 80%;
		margin: 0 auto;
		left: 0;
	}
`;

const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

export const Features = () => {
	return (
		<Section>
			<Container>
				<Wrap>
					<ColumnLeft>
						<Content>
							<h1>Información Detallada</h1>

							<p>Te Entregremos la información de forma rapida y sencilla.</p>
							<p>
								podrás ver en detalle todos los cobros realizados y todos los gastos que incurre la
								administracíon.
							</p>
							<Button to="/proyectos">Aprende mas</Button>
						</Content>
					</ColumnLeft>
					<ColumnRight>
						<Image src={FeatureOne} />
					</ColumnRight>
				</Wrap>
			</Container>
		</Section>
	);
};
