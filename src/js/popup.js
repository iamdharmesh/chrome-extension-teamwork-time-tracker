import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '../css/index.css';
import '../css/popup.css';
import { getApiToken } from './utils';
import { ApiTokenForm, Timers, Logout, CreateTimer } from './components';
import { getTimers } from './api/teamwork';

const Popup = () => {
	const [error, setError] = useState('');
	const [timers, setTimers] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [apiToken, setApiToken] = useState(null);

	useEffect(() => {
		async function checkApiToken() {
			const token = await getApiToken();
			if (!token) {
				setIsLoaded(true);
				return;
			}
			setApiToken(token);
		}
		checkApiToken();
	}, []);

	async function fetchTimers() {
		try {
			setError('');
			const res = await getTimers();
			if (res.errors) {
				setError(res.errors[0]?.detail || 'Unknown error');
				setIsLoaded(true);
				return;
			}

			const timers = res.timers || [];
			const included = res.included || { projects: {}, tasks: {} };
			const timerData = timers.map((timer) => {
				const start = new Date(timer.lastStartedAt);
				const current = new Date();
				const diff = (current.getTime() - start.getTime()) / 1000;
				if (timer.running) {
					timer.duration += diff;
				}
				return {
					id: timer.id,
					description: timer.description,
					project: included.projects[timer.projectId]?.name,
					task: included.tasks[timer.taskId]?.name,
					time: timer.duration,
					running: timer.running,
				};
			});
			setTimers(timerData);
			setIsLoaded(true);
		} catch (error) {
			setError(error.message);
			console.error('Error fetching timers:', error);
			setIsLoaded(true);
		}
	}

	useEffect(() => {
		if (!apiToken) {
			return;
		}

		fetchTimers();
	}, [apiToken]);

	if (!isLoaded) {
		return <div className="teamwork-loading">Loading...</div>;
	}

	if (error) {
		return (
			<>
				<div style={{ color: 'red' }}>Error: {error}</div>
				{apiToken && (
					<Logout
						onLogout={() => {
							setApiToken(null);
							setError('');
						}}
					/>
				)}
			</>
		);
	}

	if (!apiToken) {
		return <ApiTokenForm />;
	}

	if (timers.length === 0) {
		return (
			<>
				<CreateTimer closeModal={() => fetchTimers()} inPopup />
				<div className="footer">
					<Logout onLogout={() => setApiToken(null)} />
				</div>
			</>
		);
	}

	return <Timers timers={timers} setApiToken={setApiToken} reloadTimers={() => fetchTimers()} />;
};

const root = createRoot(document.getElementById('extension-popup-root'));

root.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>,
);
