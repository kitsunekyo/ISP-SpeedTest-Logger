import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { color, size } from 'shared/utils/style';

const Selector = styled.div`
	display: flex;
	align-items: center;
`;

const Title = styled.h2`
	margin: 0;
	display: inline-block;
	font-size: 1rem;
	margin-right: 0.5rem;
`;

const Option = styled.div`
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

const Label = styled.label`
	margin-left: 0.25rem;
`;

const options = ['off', '6h', '12h', '24h'];

const ScheduleSelector = ({ value, onChange, ...otherProps }) => {
	return (
		<Selector {...otherProps}>
			<Title>Auto Test Interval</Title>
			{options.map((option, index) => (
				<Option key={`schedule-option-${option}`}>
					<input
						type="radio"
						value={index}
						name="schedule"
						id={option}
						checked={value === index}
						onChange={v => onChange(v.target.value)}
					/>
					<Label htmlFor={option}>{option}</Label>
				</Option>
			))}
		</Selector>
	);
};

export default ScheduleSelector;
