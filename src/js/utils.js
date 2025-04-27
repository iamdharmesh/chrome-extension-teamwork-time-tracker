/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
export const storeApiToken = async (data) => {
	try {
		await chrome.storage.sync.set({ apiToken: data });
	} catch (error) {
		console.error('Error setting user data:', error);
	}
};

export const getApiToken = async () => {
	try {
		const data = await chrome.storage.sync.get('apiToken');
		return data.apiToken;
	} catch (error) {
		console.error('Error getting user data:', error);
		return null;
	}
};

export const removeApiToken = async () => {
	try {
		await chrome.storage.sync.remove('apiToken');
	} catch (error) {
		console.error('Error removing user data:', error);
	}
};

export const getHoursAndMinutes = (time) => {
	const timeParts = time.split(':');
	const hours = timeParts[0] && !isNaN(timeParts[0]) ? parseInt(timeParts[0], 10) : 0;
	const minutes = timeParts[1] && !isNaN(timeParts[0]) ? parseInt(timeParts[1], 10) : 0;

	return { hours, minutes };
};

export const hasValidTime = (time) => {
	const { hours, minutes } = getHoursAndMinutes(time);
	return hours > 0 || minutes > 0;
};

export const getIssueUrl = async (inPopup) => {
	try {
		if (!inPopup) {
			return window.location.href;
		}

		const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
		if (
			tab &&
			tab.url &&
			((tab.url.includes('https://github.com/') &&
				(tab.url.includes('/pull/') || tab.url.includes('/issues/'))) ||
				(tab.url.includes('https://linear.app/') && tab.url.includes('/issue/')))
		) {
			return tab.url;
		}
		return '';
	} catch (error) {
		console.error('Error getting current URL:', error);
		return '';
	}
};

const getRecentTaskKey = async (inPopup) => {
	try {
		const url = await getIssueUrl(inPopup);
		if (!url) {
			return '';
		}

		const parsedUrl = new URL(url);
		const path = parsedUrl.pathname;
		const parts = path.split('/');
		const key = `last_selection_${parts[1]}_${parts[2]}`;
		return key;
	} catch (error) {
		console.error('Error getting recent task key:', error);
		return '';
	}
};

export const getRecentTaskInfo = async (inPopup) => {
	try {
		const key = await getRecentTaskKey(inPopup);
		if (!key) {
			return {};
		}

		const data = await chrome.storage.sync.get(key);
		return data[key] || {};
	} catch (error) {
		console.error('Error getting recent task:', error);
		return {};
	}
};

export const setRecentTaskInfo = async (inPopup, data) => {
	try {
		const key = await getRecentTaskKey(inPopup);
		if (!key) {
			return;
		}

		await chrome.storage.sync.set({ [key]: data });
	} catch (error) {
		console.error('Error setting recent task:', error);
	}
};
