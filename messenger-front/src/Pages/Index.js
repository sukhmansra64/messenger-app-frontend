import React, {useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";

const Index = (props) => {
    const [hasToken,setHasToken] = useState(false);
    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (!token) {
            setHasToken(false);
        } else {
            setHasToken(true);
        }
        // eslint-disable-next-line
    }, [0]);


    const loginRegister = () =>{
        return(
            <Container><h1>Has token</h1></Container>
        );
    }
    return <div className='container' style={{height:'100%', width: '100%', }}>
        <Container></Container>
        <table style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            textAlign: 'center', minHeight: '100vh'}}>
            <Row>
                <Col>
                    {hasToken ? loginRegister():<Container>Has no token</Container>}
                </Col>
            </Row>
        </table>

    </div>;
}

export default Index;