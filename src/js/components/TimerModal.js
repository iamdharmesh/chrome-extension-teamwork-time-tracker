import React from 'react';
import Modal from 'react-modal';
import { CreateTimer } from './CreateTimer';

import '../../css/index.css';

// Modal styling
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.60)',
	},
};

export const TimerModal = ({ isModalOpen, setIsModalOpen }) => {
	if (!isModalOpen) {
		return null;
	}

	return (
		<div className="teamwork-model-wrapper">
			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				style={customStyles}
				contentLabel="Create Timer Form"
				ariaHideApp={false}
			>
				<CreateTimer closeModal={() => setIsModalOpen(false)} />
			</Modal>
		</div>
	);
};
