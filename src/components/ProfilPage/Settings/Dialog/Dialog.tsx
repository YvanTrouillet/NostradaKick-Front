import { ReactNode, useRef, useEffect } from "react";
import "./Dialog.scss";

interface DialogProps {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

const Dialog = ({ children, isOpen, onClose }: DialogProps) => {
	const refModal = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (isOpen) {
			refModal.current?.showModal();
		} else {
			refModal.current?.close();
		}
	}, [isOpen]);

	const handleClose = () => {
		onClose();
	};

	return (
		<div className="container__dialog">
			<dialog ref={refModal} onClose={handleClose} className="dialog">
				{children}
			</dialog>
		</div>
	);
};

export default Dialog;
