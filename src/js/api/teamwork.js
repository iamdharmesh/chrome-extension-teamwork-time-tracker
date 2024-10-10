const { getApiToken, removeApiToken } = require('../utils');

const callTeamworkAPI = async (endpoint, params) => {
	return getApiToken()
		.then((token) => {
			const auth = btoa(`${token}:password`);
			return fetch(`https://tenup.teamwork.com/${endpoint}`, {
				headers: {
					Authorization: `Basic ${auth}`,
					'X-Set-WWW-Authenticate': 'false',
				},
				...params,
			});
		})
		.then((res) => {
			return res.json();
		});
};

export const getTimers = async () => {
	return callTeamworkAPI(
		'projects/api/v3/me/timers.json?include=projects,tasks&fields[projects]=id,name&fields[tasks]=id,name',
		{},
	);
};

export const getProjects = async () => {
	return callTeamworkAPI('projects/api/v3/projects.json', {});
};

export const getTaskLists = async (projectId) => {
	return callTeamworkAPI(`projects/api/v3/tasklists?projectIds=${projectId}`, {});
};

export const getTasks = async (projectId, taskListId) => {
	return callTeamworkAPI(
		`projects/api/v3/tasks.json?projectIds=${projectId}&tasklistIds=${taskListId}`,
		{},
	);
};

export const createTimer = (description, projectId, taskId) => {
	return callTeamworkAPI('projects/api/v3/me/timers.json', {
		method: 'POST',
		body: JSON.stringify({
			timer: {
				description,
				projectId: +projectId,
				stopRunningTimers: true,
				taskId: +taskId,
			},
		}),
	});
};

export const logTime = (taskId, data) => {
	return callTeamworkAPI(`projects/api/v3/tasks/${taskId}/time.json`, {
		method: 'POST',
		body: JSON.stringify(data),
	});
};

export const pauseTimer = (timerId) => {
	return callTeamworkAPI(`/projects/api/v3/me/timers/${timerId}/pause.json`, {
		method: 'PUT',
	});
};

export const resumeTimer = (timerId) => {
	return callTeamworkAPI(`/projects/api/v3/me/timers/${timerId}/resume.json`, {
		method: 'PUT',
	});
};

export const completeTimer = (timerId) => {
	return callTeamworkAPI(`/projects/api/v3/me/timers/${timerId}/complete.json`, {
		method: 'PUT',
	});
};
