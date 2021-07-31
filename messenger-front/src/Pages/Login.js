import React from 'react';
import axios from "axios";
import makeToast from "../Toaster";
import {withRouter} from "react-router";
import {Container} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const Login = (props) =>{
    //declares ref
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    //posts the email and password to the server, if they are valid the server returns a jwt token
    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios
            .post("http://localhost:8080/user/login", {
                email,
                password,
            })
            .then((response) => {
                makeToast("success", response.data.message);
                localStorage.setItem("CC_Token", response.data.token);
                props.history.push("/dashboard");
            })
            .catch((err) => {
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )
                    makeToast("error", err.response.data.message);
            });
    }
        return(
            <Container className='bg-dark' style={{height:'100%', width: '100%', }}>
                <Container style={{width: '130px', position: 'fixed', left:20, top:20}} className='border border-light rounded-3'>
                    <h1 className='text-light'>chat.Y</h1>
                </Container>
                <Link to='/'>
                    <Button className='btn-light' style={{position:'fixed',left:40, top:90, width:65}}>Back</Button>
                </Link>
                <Container className='card bg-dark border border-light'>
                    <Container className='cardHeader bg-dark text-light rounded-3 border border-light'>Login</Container>
                    <Container className='cardBody'>
                        <Container className='inputGroup'>
                            <label htmlFor='email' className='text-light'>Email</label>
                            <input type='email' name='email' id='email' placeholder='example@example.com'  className='rounded-3 border border-light' ref={emailRef}/>
                        </Container>
                        <Container className='inputGroup'>
                            <label htmlFor='password' className='text-light'>Password</label>
                            <input type='password' name='password' id='password' placeholder='Password' className='rounded-3 border border-light' ref={passwordRef}/>
                        </Container>
                        <Button onClick={loginUser} className='btn-light'>Login</Button>
                    </Container>
                </Container>
                <footer style={{position:"absolute", bottom:0}}>
                    <span className='text-light'>Made by Sukhman Sra.</span>
                    <br/>
                    <span><a href='https://www.linkedin.com/in/sukhsra/' target="_blank" rel="noopener noreferrer"><u className='link-light'>LinkedIn</u></a></span>
                    <br/>
                    <span><a href='https://github.com/sukhmansra64' target="_blank" rel="noopener noreferrer"><u className='link-light'>GitHub</u></a></span>
                </footer>
            </Container>
    );
}

export default withRouter(Login);