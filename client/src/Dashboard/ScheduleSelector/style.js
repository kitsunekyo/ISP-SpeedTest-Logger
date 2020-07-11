import styled from 'styled-components';
import { darken } from 'polished';

import { color, size } from 'shared/utils/style';

export const Selector = styled.div``;

export const Option = styled.div`
	display: inline-flex;
	align-items: center;
	height: 45px;
	min-width: 130px;
	padding: 0.25rem 1rem;
	background: ${props => (props.selected ? color.primary : color.w2)};
	color: ${props => (props.selected ? color.w0 : color.textPrimary)};
	border-radius: ${size.radius};
	cursor: pointer;

	:not(:last-child) {
		margin-right: 0.5rem;
	}

	:hover {
		background: ${props => darken(0.05, props.selected ? color.primary : color.w2)};
	}

	&,
	* {
		cursor: pointer;
	}
`;

export const Label = styled.label`
	margin-left: 0.25rem;
`;
