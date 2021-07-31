import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";
import axios from "axios";

const Index = (props) => {
    //sets the state
    const [hasToken,setHasToken] = useState(false);
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    //checks if token is there when mounted and fetches the user's name using a post request to the server
    //using the checkToken route
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

    //buttons to navigate through the app and sign out by removing the token
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

    //if the token is present, the component returns the appropriate menu
    const toDash = () => {
        return (
            <Container className='border border-light rounded-3' style={{height: 400, width: 320}}>
                <h1>
                    <p className='text-light'>Welcome back, {username}</p>
                </h1>
                <Button className='btn-light' onClick={onClick} style={{height: 60, width: 180, marginTop: -10}}>
                    To Dashboard
                </Button>
                <Button className='btn-light' onClick={onClick2} style={{height: 60, width: 180, marginTop: 15}}>
                    Login to a different User
                </Button>
                <Button className='btn-light' onClick={onClick3} style={{height: 60, width: 180, marginTop: 15}}>
                    Register a new account
                </Button>
                <Button className='btn-light' onClick={onClick4} style={{height: 60, width: 180, marginTop: 15}}>
                    Sign Out
                </Button>

            </Container>
        );
    }

        //if the token isn't present, the component returns a menu which will let the user login or register
        const loginRegister = () =>{
            return(
                <Container className='border border-light rounded-3' style={{height: 220, width: 320}}>
                    <h1>
                        <p className='text-light'>Welcome</p>
                    </h1>
                    <Button className='btn-light' onClick={onClick2} style={{height: 60, width: 180, marginTop: -10}}>
                        Login
                    </Button>
                    <Button className='btn-light' onClick={onClick3} style={{height: 60, width: 180, marginTop: 15}}>
                        Register
                    </Button>
                </Container>
            );
        }

    return <Container style={{height:'100%', width: '100%', }}>
        <Container style={{width: '130px', position: 'fixed', left:20, top:20}} className='border border-light rounded-3'>
            <h1 className='text-light'>chat.Y</h1>
        </Container>
        <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            textAlign: 'center', minHeight: '100vh'}}>
                    {hasToken ? toDash(): loginRegister()}
        </Container>
        <footer style={{position:"absolute", bottom:0}}>
            <span className='text-light'>Made by Sukhman Sra.</span>
            <br/>
            <span><a href='https://www.linkedin.com/in/sukhsra/' target="_blank" rel="noopener noreferrer"><u className='link-light'>LinkedIn</u></a></span>
            <br/>
            <span><a href='https://github.com/sukhmansra64' target="_blank" rel="noopener noreferrer"><u className='link-light'>GitHub</u></a></span>
        </footer>
    </Container>;
}

export default Index;