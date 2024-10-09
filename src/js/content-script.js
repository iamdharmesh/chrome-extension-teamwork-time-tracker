/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { TimerButton } from './components/TimerButton';

const renderTimerButton = () => {
	const timerButton = document.querySelector('.teamwork-timer-wrapper');
	// If the button already exists, don't render it again
	if (timerButton) {
		return;
	}

	const actions = document.querySelector('div.gh-header-actions');
	const newActions = document.querySelector('div[data-component="PH_Actions"] div:first-child');

	const wrapper = document.createElement('div');
	wrapper.classList.add('teamwork-timer-wrapper');
	if (actions != null) {
		actions.insertBefore(wrapper, actions.children[0]);
		const root = createRoot(wrapper);
		root.render(<TimerButton />);
	} else if (newActions != null) {
		// New GitHub UI for Issues
		newActions.insertBefore(wrapper, newActions.children[0]);
		const root = createRoot(wrapper);
		root.render(<TimerButton />);
	}
};

document.addEventListener('turbo:load', function () {
	renderTimerButton();
});

const renderTrackerButton = () => {
	if (document.readyState === 'loading') {
		// Loading hasn't finished yet
		document.addEventListener('DOMContentLoaded', renderTimerButton);
	} else {
		// `DOMContentLoaded` has already fired
		renderTimerButton();
	}
};

renderTrackerButton();
