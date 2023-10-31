import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteUser = (props: any) => {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='text-center'>
                    <Modal.Title style={{ fontSize: '24px' }}>
                        Xóa thông tin nhân viên
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer className='justify-content-start'>
                    <Button variant="primary" onClick={props.onHide}>
                        Đồng ý
                    </Button>
                    <Button variant="success" onClick={props.onHide}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteUser;