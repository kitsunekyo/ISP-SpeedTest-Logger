import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	padding-right: 1rem;
	padding-left: 1rem;
	margin-right: auto;
	margin-left: auto;
`;

export const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-left: -1rem;
	margin-right: -1rem;

	& + & {
		margin-top: 1rem;
	}
`;

export const Col = styled.div`
	position: relative;
	width: 100%;
	padding-right: 1rem;
	padding-left: 1rem;
	flex-basis: 0;
	flex-grow: 1;
	max-width: 100%;
	margin-bottom: 1rem;

	@media (min-width: 991px) {
		margin-bottom: 0;
	}
`;
