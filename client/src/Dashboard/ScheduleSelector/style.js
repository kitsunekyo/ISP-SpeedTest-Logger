import styled from 'styled-components';
import { darken } from 'polished';

import { color, size } from 'shared/utils/style';

export const Selector = styled.div`
	display: flex;
	align-items: center;
`;

export const Title = styled.h2`
	margin: 0;
	display: inline-block;
	font-size: 1rem;
	margin-right: 0.5rem;
`;

export const Option = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 0.25rem 0.5rem;
	background: ${color.w2};
	color: ${color.textPrimary};
	border-radius: ${size.radius};

	:not(:last-child) {
		margin-right: 0.5rem;
	}

	:hover {
		background: ${darken(0.05, color.w2)};
	}

	&,
	* {
		cursor: pointer;
	}
`;

export const Label = styled.label`
	margin-left: 0.25rem;
`;