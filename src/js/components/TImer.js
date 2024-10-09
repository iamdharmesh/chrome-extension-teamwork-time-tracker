import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// Extend dayjs with the duration plugin
dayjs.extend(duration);

export const Timer = ({ initialSeconds, running }) => {
	// State to hold the elapsed time
	const [elapsedTime, setElapsedTime] = useState(initialSeconds);

	// Format the time in HH:MM:SS
	const formatTime = (seconds) => {
		const durationObj = dayjs.duration(seconds, 'seconds');
		return durationObj.format('HH:mm:ss');
	};

	// Use useEffect to start the timer
	useEffect(() => {
		if (running) {
			const intervalId = setInterval(() => {
				setElapsedTime((prevTime) => prevTime + 1);
			}, 1000);

			// Clear the interval on component unmount
			return () => clearInterval(intervalId);
		}
		return () => {};
	}, [running]);

	return (
		<div className="timer">
			<p>{formatTime(elapsedTime)}</p>
		</div>
	);
};
