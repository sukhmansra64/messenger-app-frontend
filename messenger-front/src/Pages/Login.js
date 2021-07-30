import React from 'react';
import axios from "axios";
import makeToast from "../Toaster";
import {withRouter} from "react-router";
import {Container} from "react-bootstrap";
import {Button} from "react-bootstrap";

const Login = (props) =>{
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

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
                <Container className='card bg-dark border border-light'>
                    <Container className='cardHeader bg-dark text-light rounded-3 border border-light'>Login</Container>
                    <div className='cardBody'>
                        <div className='inputGroup'>
                            <label htmlFor='email' className='text-light'>Email</label>
                            <input type='email' name='email' id='email' placeholder='example@example.com'  className='rounded-3 border border-light' ref={emailRef}/>
                        </div>
                        <div className='inputGroup'>
                            <label htmlFor='password' className='text-light'>Password</label>
                            <input type='password' name='password' id='password' placeholder='Password' className='rounded-3 border border-light' ref={passwordRef}/>
                        </div>
                        <Button onClick={loginUser} className='btn-light'>Login</Button>
                    </div>
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