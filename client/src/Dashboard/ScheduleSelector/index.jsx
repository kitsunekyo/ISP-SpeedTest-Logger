import React, { useContext, useEffect } from 'react';
import { Selector, Option, Label } from './style';

import useApi from 'shared/hooks/api';
import ToasterContext from 'shared/components/Toaster/Context';

const options = ['off', '6h', '12h', '24h'];

const ScheduleSelector = ({ ...otherProps }) => {
	const toaster = useContext(ToasterContext);

	const [scheduleState, getSchedule, setLocalSchedule] = useApi('/speedtest/schedule', 'get');
	const [, setSchedule] = useApi('/speedtest/schedule', 'post');

	const handleSetSchedule = async value => {
		try {
			await setSchedule(value);
			setLocalSchedule(parseInt(value));
			toaster.sendToast('Auto Speedtest updated');
		} catch (e) {
			console.error('error trying to update speedtest schedule', e);
		}
	};

	useEffect(() => {
		getSchedule();
	}, []);

	return (
		<Selector {...otherProps}>
			{options.map((option, index) => (
				<Option key={`schedule-option-${option}`}>
					<input
						type="radio"
						value={index}
						name="schedule"
						id={option}
						checked={scheduleState.data === index}
						onChange={v => handleSetSchedule(v.target.value)}
					/>
					<Label htmlFor={option}>{option}</Label>
				</Option>
			))}
		</Selector>
	);
};

export default ScheduleSelector;
