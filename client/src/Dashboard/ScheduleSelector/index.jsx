import React from 'react';
import { Selector, Title, Option, Label } from './style';

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
