/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TimerModal } from './TimerModal';

export const TimerButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button
				className="teamwork-timer Button--secondary Button--small Button Button--fullWidth"
				type="button"
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					role="img"
					className="size-[--lsds-a-icon-size-md] text-icon-subtle"
					viewBox="0 0 24 24"
					width="20"
					height="20"
				>
					<path
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M7 6.626c0-.745 0-1.117.155-1.322A.77.77 0 017.721 5c.257-.016.567.191 1.186.604l8.062 5.374c.512.342.767.512.857.727.078.188.078.4 0 .588-.09.215-.345.385-.857.727l-8.062 5.374c-.62.413-.93.62-1.186.604a.77.77 0 01-.566-.303C7 18.491 7 18.12 7 17.374z"
					/>
				</svg>
				Start timer
			</button>
			<TimerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</>
	);
};
