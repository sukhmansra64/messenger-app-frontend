import React from "react";
import { withRouter } from "react-router-dom";

const Chatroom = ({ match, socket }) => {
    const chatroomId = match.params.id;
    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader">Chatroom Name</div>
                <div className="chatroomContent">

                </div>
                <div className="chatroomActions">
                    <div>
                        <input
                            type="text"
                            name="message"
                            placeholder="Say something!"

                        />
                    </div>
                    <div>
                        <button className="join">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Chatroom);