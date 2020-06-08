import React from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
	padding: 25px 32px 50px 32px;
	overflow-x: hidden;
`;

const Page = ({ children }) => {
	return <StyledPage>{children}</StyledPage>;
};

export default Page;
