import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";

const Section = styled.section`
	background: #000d1a;
	color: #fff;
	width: 100%;
	min-height: 50px;
	padding: 1rem calc((100vw - 1300px) / 2);
`;

const SocialIcons = styled.div`
	display: absolute;
	text-align: center;
	@media screen and (max-width: 768px) {
		margin-bottom: 1rem;
		width: 100%;
	}
`;

const Icons = css`
	font-size: clamp(1rem, 6vw, 2rem);
	margin-right: 1.5rem;
	color: #79c0e9;
`;

const Instagram = styled(FaInstagram)`
	${Icons};
`;

const Facebook = styled(FaFacebookF)`
	${Icons};
`;

const Youtube = styled(FaYoutube)`
	${Icons};
`;

const Twitter = styled(FaTwitter)`
	${Icons};
`;

export const Footer = () => {
	return (
		<Section>
			<SocialIcons>
				<a href="//www.youtube.com">
					<Youtube />
				</a>
				<a href="https://www.instagram.com">
					<Instagram />
				</a>
				<a href="https://www.facebook.com">
					<Facebook />
				</a>
				<a href="https://www.twitter.com">
					<Twitter />
				</a>
			</SocialIcons>
		</Section>
	);
};
