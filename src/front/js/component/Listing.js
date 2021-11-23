import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
// import { IoMdArrowRoundForward } from "react-icons/io";
import ProjectOne from "../../img/proyecto1.jpg";
import ProjectTwo from "../../img/proyecto2.jpg";

const Section = styled.section`
	width: 100%;
	height: 70%;
	padding: 1rem calc((83vw - 1200px) / 2);
`;

const Container = styled.div`
	height: 100%;
	width: 100%;
	padding: 2rem 1rem;
`;

const Heading = styled.div`
	font-size: 1.5rem;
	padding: 2rem 1rem;
	margin-bottom: 40px;

	@media screen and (max-width: 768px) {
		text-align: start;
	}
`;

const InfoRow = styled.div`
	display: flex;
	flex-direction: row;
	padding: 1rem 0rem;

	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`;

const InfoWrap = styled.div`
	padding: 0rem 1rem;
	min-height: 350px;
	height: 100%;

	h2 {
		margin-bottom: 1rem;
		font-weight: 400;
	}

	@media screen and (max-width: 768px) {
		margin-bottom: 1rem;
	}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	max-width: 600px;
	max-height: 400px;
	object-fit: cover;
	margin-bottom: 1rem;
`;

// const InfoLink = styled(Link)`
//   display: flex;
//   align-items: center;
//   text-decoration: none;
//   color: #000d1a;
//   width: 140px;
//   transition: 0.3s;

//   &:hover {
//     transform: translateY(-2px);
//   }
// `;

// const Arrow = styled(IoMdArrowRoundForward)`
//   margin-left: 10px;
// `;

export const Listing = () => {
	return (
		<Section>
			<Container>
				<Heading>
					<h1>Ve nuestros ultimos Proyectos</h1>
				</Heading>
				<InfoRow>
					<InfoWrap>
						<Image src={ProjectOne} alt="home" />
						<h2>Proyecto ISA Mayecura Las Condes, Santiago</h2>
					</InfoWrap>
					<InfoWrap>
						<Image src={ProjectTwo} alt="home" />
						<h2>Proyecto Teniente Montt 1980 Providencia, Santiago</h2>
					</InfoWrap>
				</InfoRow>
			</Container>
		</Section>
	);
};
