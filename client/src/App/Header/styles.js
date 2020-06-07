import styled from 'styled-components';

import { color } from 'shared/utils/style';

export const StyledHeader = styled.header`
	background-color: ${color.w1};
	padding: 10px 2rem;
	align-items: center;
`;

export const Container = styled.div`
	display: flex;
	align-items: center;
`;

export const Title = styled.div`
	font-weight: 500;
`;

export const Links = styled.div`
	margin-left: auto;
`;
