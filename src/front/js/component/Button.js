import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

export const Button = styled(Link)`
	background: ${({ primary }) => (primary ? "#000d1a" : "#79c0e9")};
	white-space: nowrap;
	outline: none;
	border: none;
	min-width: 100px;
	max-width: 200px;
	cursor: pointer;
	text-decoration: none;
	border-radius: 12px;
	transition: 0.3s;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${({ big }) => (big ? "16px 40px" : "14px 24px")};
	color: ${({ primary }) => (primary ? "#fff" : "#fff")};
	font-size: ${({ big }) => (big ? "24px" : "16px")};

	&:hover {
		transform: translateY(-2px);
		background: #00447c;
		text-decoration: none;
	}
`;

export const Inicio = styled(FaUserAlt)`
	display: block;
	color: #fff;
	display: block;
	background-size: contain;
	height: 40px;
	width: 40px;
	cursor: pointer;
	position: absolute;
	margin-top: 10px;
	margin-right: 22px;
	top: 0;
	right: 0;
`;
