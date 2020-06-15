import React from 'react';
import styled from 'styled-components';

const StyledValueTile = styled.div``;
const Title = styled.div``;
const Icon = styled.div`
	font-size: 0.75rem;
	color: #ccc;
`;
const Value = styled.div`
	font-size: 1.6rem;
	font-weight: bold;
`;

const Unit = styled.span`
	font-size: 0.75rem;
	color: #ccc;
`;

const ValueTile = ({ title, icon, value, unit }) => {
	return (
		<StyledValueTile>
			<Title>
				{title} <Icon>{icon}</Icon>
			</Title>
			<Value>
				{value} <Unit>{unit}</Unit>
			</Value>
		</StyledValueTile>
	);
};

export default ValueTile;
