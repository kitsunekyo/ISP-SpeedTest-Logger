import styled from 'styled-components';

import { color } from 'shared/utils/style';

export const PageTitle = styled.h1`
	margin-top: 0;
`;

export const SectionTitle = styled.h2`
	margin-top: 2rem;
	font-size: 1rem;
	color: ${color.textSecondary};
`;

export const StyledDashboard = styled.div`
	padding: 2rem;
	min-height: 100vh;
	background-color: #fafafa;
	margin: 0 0 80px 0;
	@media (min-width: 900px) {
		padding: 50px;
		margin: 0 0 0 100px;
	}
`;
