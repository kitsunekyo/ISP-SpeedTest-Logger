import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
	padding: 2rem 3rem;
	background: white;
	border-radius: 10px;
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
