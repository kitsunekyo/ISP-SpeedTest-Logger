import React, { useContext, useEffect, useState } from 'react';
import { Selector, Option } from './style';

import { ToasterContext } from 'Toaster';
import { authFetchContext } from 'Auth/AuthFetchContext';

const options = ['off', '6h', '12h', '24h'];

const ScheduleSelector = ({ ...otherProps }) => {
    const toaster = useContext(ToasterContext);
    const { authApi } = useContext(authFetchContext);
    const [schedule, setSchedule] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            const { data } = await authApi.get('/speedtest/schedule');
            setSchedule(data.value);
        })();
    }, [authApi]);

    const handleSetSchedule = async (value: number) => {
        await authApi.post('/speedtest/schedule', { value });
        setSchedule(value);
        toaster.sendToast('Auto Speedtest updated');
    };

    return (
        <Selector {...otherProps}>
            {options.map((option, index) => (
                <Option
                    key={`schedule-option-${option}`}
                    onClick={() => handleSetSchedule(index)}
                    selected={schedule === index}
                >
                    <span>{option}</span>
                </Option>
            ))}
        </Selector>
    );
};

export default ScheduleSelector;
