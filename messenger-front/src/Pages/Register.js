import React from 'react';
import axios from 'axios';
import makeToast from "../Toaster";
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";


const Register = (props) =>{
    //declares refs
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    //registers a user by posting the name, email, and password, then pushes the user to the login page
    const registerUser = ()=>{
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        axios
            .post("http://localhost:8080/user/register", {
                name,
                email,
                password,
            })
            .then((response) => {
                makeToast("success", response.data.message);
                props.history.push("/login");
            })
            .catch((err) => {
                // console.log(err);
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
        <Container>
            <Container style={{width: '130px', position: 'fixed', left:20, top:20}} className='border border-light rounded-3'>
                <h1 className='text-light'>chat.Y</h1>
            </Container>
            <Link to='/'>
                <Button className='btn-light' style={{position:'fixed',left:40, top:90, width:65}}>Back</Button>
            </Link>
            <Container className='card bg-dark text-light border border-light rounded-3'>
                <Container className='cardHeader bg-dark text-light border border-light rounded-3'>Register</Container>
                <Container className='cardBody'>
                    <Container className='inputGroup'>
                        <label htmlFor='name' className='text-light'>Name</label>
                        <input type='text' name='name' id='name' placeholder='Johnny Appleseed' ref={nameRef} className='rounded-3'/>
                    </Container>
                    <Container className='inputGroup'>
                        <label htmlFor='email' className='text-light'>Email</label>
                        <input type='email' name='email' id='email' placeholder='example@example.com' ref={emailRef} className='rounded-3'/>
                    </Container>
                    <Container className='inputGroup'>
                        <label htmlFor='password' className='text-light'>Password</label>
                        <input type='password' name='password' id='password' placeholder='Password' ref={passwordRef} className='rounded-3'/>
                    </Container>
                    <Button onClick={registerUser} className='btn-light'>Register</Button>
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

export default Register;