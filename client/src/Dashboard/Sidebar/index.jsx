import React from 'react';
import styled from 'styled-components';
import { Grid as GridIcon, GitHub as GitHubIcon } from 'react-feather';
import { Link } from 'react-router-dom';

import { color, mixin } from 'shared/utils/style';

const StyledSidebar = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
	align-items: center;
	background-color: white;
	width: 100%;
	height: 80px;
	bottom: 0;
	z-index: 100;
	${mixin.shadow}

	@media (min-width: 900px) {
		padding-top: 50px;
		width: 100px;
		height: 100vh;
		left: 0;
		top: 0;
		bottom: initial;
		justify-content: flex-start;
	}
`;

const Menu = styled.div`
	display: flex;

	@media (min-width: 900px) {
		flex-flow: column;
	}
`;
const MenuItem = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 1rem 0;
	transition: all 0.1s ease-in-out;
	cursor: pointer;

	@media (min-width: 900px) {
		margin-bottom: 2rem;
	}

	&,
	&:visited,
	&:focus {
		color: ${color.textPrimary};
	}

	&:hover {
		color: #fc0;
	}
`;

const Sidebar = () => {
	return (
		<StyledSidebar>
			<Menu>
				<MenuItem to="/">
					<GridIcon />
				</MenuItem>
				<MenuItem as="a" href="https://github.com/kitsunekyo/ISP-SpeedTest-Logger" target="_blank">
					<GitHubIcon />
				</MenuItem>
			</Menu>
		</StyledSidebar>
	);
};

export default Sidebar;
