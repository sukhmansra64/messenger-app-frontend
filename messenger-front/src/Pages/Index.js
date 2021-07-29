import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";
import axios from "axios";


const Index = (props) => {
    const [hasToken,setHasToken] = useState(false);
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (!token) {
            setHasToken(false);
        } else {
            setHasToken(true);
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id);
            axios
                .post("http://localhost:8080/checkToken", {
                    token: payload.user
                })
                .then((response) => {
                    setUsername(response.data);
                }).catch((err)=>{console.log(err.message)})
        }
        // eslint-disable-next-line
    }, [0]);
    const onClick = () =>{
        props.history.push("/dashboard");
    }
    const onClick2 = () =>{
        props.history.push("/login");
    }
    const onClick3 = () =>{
        props.history.push("/register");
    }
    const onClick4 = () =>{
        localStorage.removeItem("CC_Token");
        setHasToken(false);
    }

    const loginRegister = () =>{
        return(
            <Container className='border border-light rounded-3' style={{height: 400, width: 300}}>
                <h1>
                    <p className='text-light'>Welcome back, {username}</p>
                </h1>
                <Button className='btn-light' onClick={onClick} style={{height:60, width: 180,}}>
                        To Dashboard
                </Button>
                <Button className='btn-light' onClick={onClick2} style={{height:60, width: 180,marginTop:15}}>
                    Login to a different User
                </Button>
                <Button className='btn-light' onClick={onClick3} style={{height:60, width: 180,marginTop:15}}>
                    Register a new account
                </Button>
                <Button className='btn-light' onClick={onClick4} style={{height:60, width: 180,marginTop:15}}>
                    Sign Out
                </Button>

            </Container>
        );
    }
    return <div className='container' style={{height:'100%', width: '100%', }}>
        <Container style={{width: '15%', position: 'fixed', left:20, top:20}} className='border border-light rounded-3'>
            <h1 className='text-light'>chat.Y</h1>
        </Container>
        <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            textAlign: 'center', minHeight: '100vh'}}>
                    {hasToken ? loginRegister():<Container>Has no token</Container>}
        </Container>

    </div>;
}

export default Index;