import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';
import { Play as PlayIcon } from 'react-feather';
import styled, { keyframes } from 'styled-components';

import ToasterContext from 'shared/components/Toaster/Context';
import { round, mbyte } from 'shared/utils/math';
import useApi from 'shared/hooks/api';
import Button from 'shared/components/Button';
import ValueTile from './../ValueTile';
import { size, color, mixin } from 'shared/utils/style';

const roundedMbit = _.flow([mbyte, v => v * 8, round]);

const Status = styled.div`
	max-width: 600px;
	margin: 1rem 0;
	background: ${color.w0};
	border-radius: ${size.radius};
	display: ${props => (props.show ? 'block' : 'none')};
`;

const ProgressBarWrapper = styled.div`
	background: ${color.w2};
	width: 100%;
`;

const ProgressBar = styled.div`
	height: 8px;
	background: ${color.primary};
`;

const Values = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 1rem;
	padding: 1rem 2rem;
	${mixin.shadow};
`;

const StyledValueTile = styled(ValueTile)``;

const Speedtest = () => {
	const { sendToast } = useContext(ToasterContext);
	const [showStats, setShowStats] = useState(false);
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
					if (!showStats) setShowStats(true);
					break;
				case 'download':
					setDownload(eventData.download.bandwidth);
					setProgress(eventData.progress);
					if (!showStats) setShowStats(true);
					break;
				case 'upload':
					setUpload(eventData.upload.bandwidth);
					setProgress(eventData.progress);
					if (!showStats) setShowStats(true);
					break;
				default:
					break;
			}
		} catch (e) {
			console.log(event);
		}
	};

	const handleRunSpeedtest = async () => {
		sendToast('Speedtest is starting');
		try {
			setShowStats(true);
			await runSpeedtest();
			sendToast('Speedtest completed');
		} catch (e) {
			sendToast('Error running speedtest');
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
			<Status show={showStats}>
				<ProgressBarWrapper>
					<ProgressBar style={{ width: `${progress * 100}%` }} />
				</ProgressBarWrapper>
				<Values>
					<StyledValueTile title="Ping" unit="ms" value={round(ping)} />
					<StyledValueTile title="Download" unit="mbit" value={roundedMbit(download)} />
					<StyledValueTile title="Upload" unit="mbit" value={roundedMbit(upload)} />
				</Values>
			</Status>
		</div>
	);
};

export default Speedtest;
