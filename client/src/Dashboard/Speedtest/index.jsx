import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Play as PlayIcon } from 'react-feather';
import styled, { keyframes } from 'styled-components';

import { color } from 'shared/utils/style';
import { round, mbyte } from 'shared/utils/math';
import useApi from 'shared/hooks/api';
import Button from 'shared/components/Button';

const roundedMbit = _.flow([mbyte, round, v => v * 8]);

const ProgressBarWrapper = styled.div`
	height: 5px;
	background: ${color.w2};
	width: 100%;
`;

const ProgressBar = styled.div`
	height: 100%;
	width: ${props => props.value * 100}%;
	background: ${color.primary};
`;

const Speedtest = () => {
	const [progress, setProgress] = useState(0);
	const [download, setDownload] = useState(0);
	const [upload, setUpload] = useState(0);
	const [ping, setPing] = useState(0);

	const [{ data, error, isLoading }, runSpeedtest] = useApi('/speedtest', 'post');

	const handleEvent = event => {
		try {
			const eventData = JSON.parse(event.data);
			switch (eventData.type) {
				case 'ping':
					setPing(eventData.ping.latency);
					setProgress(eventData.progress);
					break;
				case 'download':
					setDownload(eventData.download.bandwidth);
					setProgress(eventData.progress);
					break;
				case 'upload':
					setUpload(eventData.upload.bandwidth);
					setProgress(eventData.progress);
					break;
				default:
					break;
			}
		} catch (e) {
			console.log(event);
		}
	};

	const handleRunSpeedtest = async () => {
		try {
			await runSpeedtest();
		} catch (e) {
			console.error('error running speedtest', e);
		}
	};

	useEffect(() => {
		const source = new EventSource('//localhost:3000/events');
		source.addEventListener('message', handleEvent);

		return () => {
			source.removeEventListener('message', handleEvent);
		};
	}, []);
	return (
		<div>
			<Button onClick={handleRunSpeedtest} icon={<PlayIcon size={14} />} isWorking={isLoading}>
				Run Speedtest Now
			</Button>
			<ProgressBarWrapper>
				<ProgressBar value={progress} />
			</ProgressBarWrapper>
			<div>ping {round(ping)} ms</div>
			<div>download {roundedMbit(download)} mbit</div>
			<div>upload {roundedMbit(upload)} mbit</div>
		</div>
	);
};

export default Speedtest;
