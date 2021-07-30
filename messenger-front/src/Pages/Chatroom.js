import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import axios from "axios";

const ChatroomPage = ({ match, socket }) => {
    const chatroomId = match.params.id;
    const [chatName,setChatName] = useState();
    const [messages, setMessages] = React.useState([]);
    const messageRef = React.useRef();
    const [userId, setUserId] = React.useState("");

    const sendMessage = () => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId,
                message: messageRef.current.value,
            });
            messageRef.current.value = "";
        }
    };

    React.useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id);
        }
        if (socket) {
            socket.on("newMessage", (message) => {
                const newMessages = [...messages, message];
                setMessages(newMessages);
            });
        }
        axios.post('http://localhost:8080/chatName',{id:chatroomId})
            .then((response)=>{
                setChatName(response.data);
            }).catch(
            (err)=>{
                console.error(err.message);
            }
        )
        //eslint-disable-next-line
    }, [messages]);

    React.useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", {
                chatroomId,
            });
        }

        return () => {
            //Component Unmount
            if (socket) {
                socket.emit("leaveRoom", {
                    chatroomId,
                });
            }
        };
        //eslint-disable-next-line
    }, []);

    const checkMessage = (message) => {
        if (userId === message.id){
            return {
                backgroundColor: "#0099cc"
            };
        }
        else{
            return {
                backgroundColor: "#00cc00"
            };
        }
    }

    return (
        <Container>
            <Container style={{width: '130px', position: 'fixed', left:20, top:20}} className='border border-light rounded-3'>
                <h1 className='text-light'>chat.Y</h1>
            </Container>
            <Link to='/'>
                <Button className='btn-light' style={{position:'fixed',left:40, top:90, width:65}}>Back</Button>
            </Link>
            <Container className="chatroomSection bg-dark text-light rounded-3 border border-light">
                <Container className="cardHeader bg-dark text-light rounded-3 border border-light">{chatName}</Container>
                <Container className="chatroomContent">
                    {messages.map((message, i) => (
                        <Container key={i} className="message border border-dark text-light mb-3 rounded-3" style={checkMessage(message)}>
              <span className='text-light'>
                {message.name}:
              </span>{" "}
                            {message.message}
                        </Container>
                    ))}
                </Container>
                <Container className="chatroomActions">
                    <Container>
                        <input
                            type="text"
                            name="message"
                            placeholder="Say something!"
                            ref={messageRef}
                            style={{width: 230}}
                            className='rounded-3'
                        />
                    </Container>
                    <Container>
                        <Button className="btn-light" style={{width:75, marginLeft:-25}} onClick={sendMessage}>
                            Send
                        </Button>
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
};

export default withRouter(ChatroomPage);