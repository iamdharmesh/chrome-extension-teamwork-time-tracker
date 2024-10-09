/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { storeApiToken } from '../utils';

export const ApiTokenForm = () => {
	const [apiToken, setApiToken] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');

		if (!apiToken.trim()) {
			setError('API token is required.');
		} else {
			// Save API token to storage
			storeApiToken(apiToken);
			window.location.reload();
		}
	};

	return (
		<div className="form-container">
			<h2>Connect Teamwork account</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="apiToken">API Token</label>
					<input
						type="password"
						id="apiToken"
						value={apiToken}
						onChange={(e) => setApiToken(e.target.value)}
						required
					/>
					{error && <div className="error">{error}</div>}
				</div>
				<button type="submit" className="teamwork-button button-primary">
					Connect account
				</button>
			</form>
		</div>
	);
};
