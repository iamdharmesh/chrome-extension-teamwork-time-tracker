/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { createTimer, getProjects, getTaskLists, getTasks } from '../api/teamwork';

export const CreateTimer = ({ closeModal, inPopup = false }) => {
	const [projects, setProjects] = useState([]);
	const [tasklists, setTasklists] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [selectedProject, setSelectedProject] = useState('');
	const [selectedTasklist, setSelectedTasklist] = useState('');
	const [selectedTask, setSelectedTask] = useState('');
	const [description, setDescription] = useState(inPopup ? '' : window.location?.href || '');
	const [error, setError] = useState('');

	// Fetch projects when component mounts
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const data = await getProjects();
				const projects = data.projects || [];
				setProjects(projects);
			} catch (error) {
				console.error('Error fetching projects:', error);
			}
		};

		fetchProjects();
	}, []);

	useEffect(() => {
		if (!selectedProject) {
			return;
		}

		const fetchTasklists = async (projectId) => {
			try {
				const data = await getTaskLists(projectId);
				const tasklists = data.tasklists || [];
				setTasklists(tasklists);
			} catch (error) {
				console.error('Error fetching tasklists:', error);
			}
		};

		fetchTasklists(selectedProject);
	}, [selectedProject]);

	useEffect(() => {
		if (!selectedTasklist || !selectedProject) {
			return;
		}

		const fetchTasks = async (projectId, tasklistId) => {
			try {
				const data = await getTasks(projectId, tasklistId);
				const tasks = data.tasks || [];
				setTasks(tasks);
			} catch (error) {
				console.error('Error fetching tasks:', error);
			}
		};

		fetchTasks(selectedProject, selectedTasklist);
	}, [selectedTasklist, selectedProject]);

	// Handle project selection and fetch corresponding tasks
	const handleProjectChange = (projectId) => {
		setSelectedProject(projectId);
		setSelectedTasklist('');
		setSelectedTask(''); // Reset task dropdown.
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			// Submit form data via an API or handle it as needed
			const data = await createTimer(description, selectedProject, selectedTask);
			if (data.errors && data.errors.length > 0) {
				setError(data.errors[0].detail || 'Something went wrong');
				return;
			}
			closeModal();
		} catch (error) {
			setError(`Error in start timer: ${error.message || 'Unknown error'}`);
		}
	};

	return (
		<div className="teamwork-tenup-create-timer" style={{ minWidth: '480px' }}>
			<h2>Start Timer</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-wrapper">
					<label htmlFor="project">Project:</label>
					<select
						id="project"
						value={selectedProject}
						onChange={(e) => handleProjectChange(e.target.value)}
						required
					>
						<option value="">-- Select a project --</option>
						{projects.map((project) => (
							<option key={project.id} value={project.id}>
								{project.name}
							</option>
						))}
					</select>
				</div>

				<div className="form-wrapper">
					<label htmlFor="tasklist">Task List:</label>
					<select
						id="tasklist"
						value={selectedTasklist}
						onChange={(e) => setSelectedTasklist(e.target.value)}
						required
					>
						<option value="">-- Select a task list --</option>
						{tasklists.map((tasklist) => (
							<option key={tasklist.id} value={tasklist.id}>
								{tasklist.name}
							</option>
						))}
					</select>
				</div>

				<div className="form-wrapper">
					<label htmlFor="task">Task:</label>
					<select
						id="task"
						value={selectedTask}
						onChange={(e) => setSelectedTask(e.target.value)}
						required
					>
						<option value="">-- Select a task --</option>
						{tasks.map((task) => (
							<option key={task.id} value={task.id}>
								{task.name}
							</option>
						))}
					</select>
				</div>

				<div className="form-wrapper">
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						placeholder="Enter task description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
					<button
						type="submit"
						className="Button--primary Button--medium Button button-primary teamwork-button"
					>
						Start timer
					</button>
					{!inPopup && (
						<button
							type="button"
							onClick={() => closeModal()}
							className="Button--secondary Button--medium Button button-secondary teamwork-button"
						>
							Cancel
						</button>
					)}
				</div>
			</form>
			<div className="error">{error}</div>
		</div>
	);
};
