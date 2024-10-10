/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { completeTimer, pauseTimer, resumeTimer } from '../api/teamwork';
import { removeApiToken } from '../utils';
import { Timer } from './Timer';
import { Logout } from './Logout';

export const Timers = ({ timers, setApiToken, reloadTimers }) => {
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState('');

	const processTimerAction = async (action, timerId) => {
		try {
			setError('');
			setProcessing(true);

			switch (action) {
				case 'complete':
					await completeTimer(timerId);
					break;
				case 'pause':
					await pauseTimer(timerId);
					break;
				case 'resume':
					await resumeTimer(timerId);
					break;
				default:
					break;
			}
			reloadTimers();
		} catch (error) {
			setError(error.message);
		}
		setProcessing(false);
	};

	return (
		<>
			<div className={`timer-list ${processing ? 'processing' : ''}`}>
				{timers.map((timer) => (
					<div
						className={`timer-item ${timer.running ? 'timer-active' : ''}`}
						key={timer.id}
						id={timer.id}
					>
						<h3 className="project-name">{timer.project}</h3>
						<p className="task-name">{timer.task}</p>
						<p className="timer-display">
							<Timer initialSeconds={timer.time} running={timer.running} /> <br />
						</p>
						<div className="timer-buttons">
							<button
								className="teamwork-button button-primary"
								onClick={() => {
									processTimerAction('complete', timer.id);
								}}
								type="button"
							>
								Stop
							</button>
							{timer.running && (
								<button
									className="teamwork-button button-secondary"
									onClick={() => {
										processTimerAction('pause', timer.id);
									}}
									type="button"
								>
									Pause
								</button>
							)}
							{!timer.running && (
								<button
									className="teamwork-button button-secondary"
									onClick={() => {
										processTimerAction('resume', timer.id);
									}}
									type="button"
								>
									Resume
								</button>
							)}
						</div>
					</div>
				))}
			</div>
			{error && <div style={{ color: 'red' }}>Error: {error}</div>}
			<div className="footer">
				<Logout onLogout={() => setApiToken(null)} />
			</div>
		</>
	);
};
