import React, { ReactNode } from "react";

import "./Modal.css";

interface ModalPropTypes {
	children: ReactNode;
	closeModal: () => void;
}

const Modal: React.FC<ModalPropTypes> = ({ children, closeModal }) => {
	return (
		<div className="modal-backdrop">
			<div className="modal">
				<div className="modal-body">
					{children}
					<button className="close-btn" onClick={closeModal}>
						Ok
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
