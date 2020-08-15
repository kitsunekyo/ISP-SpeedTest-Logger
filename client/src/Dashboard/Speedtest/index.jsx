import React, { useEffect, useState, useContext } from 'react';
import flow from 'lodash/flow';
import { Play as PlayIcon } from 'react-feather';
import socketIOClient from 'socket.io-client';

import { SocketContext } from 'shared/Socket';
import ToasterContext from './../../Toaster/Context';
import { round, mbyte } from 'shared/utils/math';
import useApi from 'shared/hooks/api';
import Button from 'shared/components/Button';
import ValueTile from './../ValueTile';
import { Status, ProgressBar, ProgressBarWrapper, Values } from './style';

const roundedMbit = flow([mbyte, v => v * 8, round]);

const Speedtest = () => {
	const { sendToast } = useContext(ToasterContext);
	const { socket } = useContext(SocketContext);
	const [showStats, setShowStats] = useState(false);
	const [progress, setProgress] = useState(0);
	const [download, setDownload] = useState(0);
	const [upload, setUpload] = useState(0);
	const [ping, setPing] = useState(0);
	const { state, request: runSpeedtest } = useApi('/speedtest', 'post');

	const handleEvent = eventData => {
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
		socket.on('speedtest-progress-event', handleEvent);
		return () => {
			socket.removeEventListener('speedtest-progress-event', handleEvent);
		};
	}, [socket]);

	return (
		<div>
			<Button
				onClick={handleRunSpeedtest}
				icon={<PlayIcon size={14} />}
				isWorking={state.isLoading}
			>
				Run Speedtest Now
			</Button>
			<Status show={showStats}>
				<ProgressBarWrapper>
					<ProgressBar style={{ width: `${progress * 100}%` }} />
				</ProgressBarWrapper>
				<Values>
					<ValueTile title="Ping" unit="ms" value={round(ping)} />
					<ValueTile title="Download" unit="mbit" value={roundedMbit(download)} />
					<ValueTile title="Upload" unit="mbit" value={roundedMbit(upload)} />
				</Values>
			</Status>
		</div>
	);
};

export default Speedtest;
