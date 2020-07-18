import React, { useContext } from 'react';
import { Selector, Option } from './style';

import useApi from 'shared/hooks/api';
import ToasterContext from './../../Toaster/Context';

const options = ['off', '6h', '12h', '24h'];

const ScheduleSelector = ({ ...otherProps }) => {
	const toaster = useContext(ToasterContext);

	const { state: scheduleState, setData: setLocalSchedule } = useApi(
		'/speedtest/schedule',
		'get',
		true
	);
	const { request: setSchedule } = useApi('/speedtest/schedule', 'post');

	const handleSetSchedule = async value => {
		try {
			await setSchedule(value);
			setLocalSchedule(parseInt(value));
			toaster.sendToast('Auto Speedtest updated');
		} catch (e) {
			console.error('error trying to update speedtest schedule', e);
		}
	};

	return (
		<Selector {...otherProps}>
			{options.map((option, index) => (
				<Option
					key={`schedule-option-${option}`}
					onClick={() => handleSetSchedule(index)}
					selected={scheduleState.data === index}
				>
					<span>{option}</span>
				</Option>
			))}
		</Selector>
	);
};

export default ScheduleSelector;
