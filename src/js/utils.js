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
