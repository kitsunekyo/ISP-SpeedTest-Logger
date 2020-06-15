import styled from 'styled-components';

export const DashboardPage = styled.div``;

export const Row = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;

	&:not(:last-child) {
		margin-bottom: 2rem;
	}

	> * {
		flex-grow: 1;

		&:not(:last-child) {
			margin-bottom: 1rem;

			@media (min-width: 900px) {
				margin-bottom: auto;
				margin-right: 1rem;
			}
		}
	}
`;

export const Content = styled.div`
	padding: 50px;
	min-height: 100vh;
	background-color: #fafafa;
	margin: 0 0 80px 0;
	@media (min-width: 900px) {
		margin: 0 0 0 100px;
	}
`;
