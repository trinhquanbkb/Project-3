import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
import authBg from "../../assets/images/auth-bg.png";

interface AccountLayoutProps {
    bottomLinks?: any;
    children?: any;
}

const AuthLayout = ({ bottomLinks, children }: AccountLayoutProps) => {
    // const { t } = useTranslation();

    useEffect(() => {
        if (document.body) document.body.classList.add('authentication-bg');

        return () => {
            if (document.body) document.body.classList.remove('authentication-bg');
        };
    }, []);

    return (
        <>
            <div className="account-pages py-5 d-flex align-items-center justify-content-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col xl={10}>
                            <Card>
                                <Card.Body className="p-0">
                                    <Row className="g-0 justify-content-center">

                                        <Col lg={6} className="d-none d-md-inline-block">
                                            <img src={authBg} alt="" className="img-fluid" />
                                        </Col>

                                        <Col lg={6} className="p-4">
                                            {children}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* bottom links */}
                            {bottomLinks}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default AuthLayout;
