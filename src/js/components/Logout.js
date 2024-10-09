import React from 'react';
import { removeApiToken } from '../utils';

export const Logout = ({ onLogout = () => {} }) => {
	return (
		<button
			className="logout-button"
			type="button"
			onClick={() => {
				removeApiToken();
				onLogout();
			}}
		>
			Logout
		</button>
	);
};
