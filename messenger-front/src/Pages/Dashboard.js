import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import {Button, Container} from "react-bootstrap";

const Dashboard = () =>{
    const [chatrooms, setChatrooms] = React.useState([]);
    const chatroomRef = React.useRef();
    const getChatrooms = () => {
        axios.get("http://localhost:8080/chatroom", {
                headers: {
                    Authorization: localStorage.getItem("CC_Token"),
                },
            }).then((response) => {
                setChatrooms(response.data);
            }).catch((err) => {
                setTimeout(getChatrooms, 3000);
            });
    };
    const setChatroom = () =>{
        axios.post('http://localhost:8080/chatroom',{
            name: chatroomRef.current.value
            },
            {headers:{
                Authorization: localStorage.getItem("CC_Token")
            }
        }).then(()=>{
            getChatrooms();
            chatroomRef.current.value = ""
        }).catch((err)=>{
            console.error(err.message);
        })
    }
    React.useEffect(() => {
        getChatrooms();
        // eslint-disable-next-line
    }, []);
    return(
        <Container>
            <Container style={{width: '130px', position: 'fixed', left:20, top:20}} className='border border-light rounded-3'>
                <h1 className='text-light'>chat.Y</h1>
            </Container>
            <Link to='/'>
                <Button className='btn-light' style={{position:'fixed',left:40, top:90, width:65}}>Back</Button>
            </Link>
            <Container className='card bg-dark text-light border border-light rounded-3'>
                <Container className='cardHeader bg-dark text-light border border-light rounded-3'>Chatrooms</Container>
                <Container className='cardBody'>
                    <Container className='inputGroup'>
                        <label htmlFor='chatroomName' className='text-light'>Chatrooms</label>
                        <input type='text' name='chatroomName' id='chatroomName' placeholder='Name' className='rounded-3' ref={chatroomRef}/>
                    </Container>
                    <Button className='btn-light' onClick={setChatroom}>Create</Button>
                    <Container className="chatrooms">
                        {chatrooms.map((chatroom) => (
                            <Container key={chatroom._id} className="chatroom">
                                <Container className='text-light'>{chatroom.name}</Container>
                                <Link to={"/chatroom/" + chatroom._id}>
                                    <Button className="join btn-light">Join</Button>
                                </Link>
                            </Container>
                        ))}
                    </Container>
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

export default Dashboard;