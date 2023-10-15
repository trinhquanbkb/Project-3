import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container-fluid">
                <Row>
                    <Col sm={12}>
                        {currentYear} &copy; DP Cargo
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;
