import React from 'react';
import styled from 'styled-components';

import { mixin } from 'shared/utils/style';

const Card = styled.div`
	padding: 2rem 3rem;
	background: white;
	border-radius: 10px;
	${mixin.shadow}
`;

const Title = styled.h3`
	font-size: 1rem;
	font-weight: bold;
	margin: 0;
`;

const Body = styled.div``;

export default ({ title, children }) => {
	return (
		<Card>
			{title && <Title>{title}</Title>}
			<Body>{children}</Body>
		</Card>
	);
};
