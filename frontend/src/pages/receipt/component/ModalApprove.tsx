import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalApprove = (props: any) => {
	return (
		<>
			<Modal
				{...props}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className="modal-delete-tracking "
			>
				<Modal.Header className="text-center justify-content-center">
					<Modal.Title
						style={{ fontSize: "24px", wordBreak: "break-word" }}
					>
						{props.content}
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer className="justify-content-center">
					<Button
						variant="outline-warning"
						onClick={async () => {
							props.onHide();
							props.handleCancel();
							props.handleClick();
						}}
						disabled={props.buttonDisabled}
					>
						<span>Huỷ phiếu</span>
						<i className="uil uil-times"></i>
					</Button>
					<Button
						variant="primary"
						onClick={async () => {
							props.handleAction();
							props.handleClick();
						}}
						disabled={props.buttonDisabled}
					>
						<span className="mr-5">Xác nhận</span>
						<i className="uil uil-check"></i>
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalApprove;
