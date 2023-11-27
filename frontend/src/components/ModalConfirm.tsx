import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalConfirm = (props: any) => {
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
						onClick={() => {
							props.onHide();
							props.handleCancel();
						}}
					>
						<span>Đóng</span>
						<i className="uil uil-times"></i>
					</Button>
					<Button
						variant="primary"
						onClick={async () => {
							props.handleAction();
						}}
					>
						<span className="mr-5">Xác nhận</span>
						<i className="uil uil-check"></i>
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalConfirm;
