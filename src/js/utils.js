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
