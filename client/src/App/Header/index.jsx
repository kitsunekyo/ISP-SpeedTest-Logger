import React from 'react';

import { StyledHeader, Container, Title, Links } from './styles';

const Header = () => {
	return (
		<StyledHeader>
			<Container>
				<Title>network quality</Title>
				<Links>
					<a href="https://github.com/kitsunekyo/internet-speed-log/">github</a>
				</Links>
			</Container>
		</StyledHeader>
	);
};

export default Header;
