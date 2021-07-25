import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () =>{
    const [chatrooms, setChatrooms] = React.useState([]);
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
    React.useEffect(() => {
        getChatrooms();
        // eslint-disable-next-line
    }, []);
    return(
        <div className='card'>
            <div className='cardHeader'>Chatrooms</div>
            <div className='cardBody'>
                <div className='inputGroup'>
                    <label htmlFor='chatroomName'>Chatrooms</label>
                    <input type='text' name='chatroomName' id='chatroomName' placeholder='Name'/>
                </div>
                <button>Create</button>
                <div className="chatrooms">
                    {chatrooms.map((chatroom) => (
                        <div key={chatroom._id} className="chatroom">
                            <div>{chatroom.name}</div>
                            <Link to={"/chatroom/" + chatroom._id}>
                                <div className="join">Join</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;