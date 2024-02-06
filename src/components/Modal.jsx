import React from 'react';

function Modal({ children }) {
	return (
		<div className="modal">
			<div className="modal-box">{children}</div>
		</div>
	);
}

export default Modal;
