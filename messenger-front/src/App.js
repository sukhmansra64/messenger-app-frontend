import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Index from "./Pages/Index";
import Chatroom from "./Pages/Chatroom";
import io from "socket.io-client";
import makeToast from "./Toaster";

function App() {
    //set up the client side socket to allow for it to interact with the server
    const [socket, setSocket] = React.useState(null);

    const setupSocket = () => {
        const token = localStorage.getItem("CC_Token");
        if (token && !socket) {
            const newSocket = io("http://localhost:8080", {
                query: {
                    token: localStorage.getItem("CC_Token"),
                }, transports: ['websocket', 'polling', 'flashsocket']
            });

            newSocket.on("disconnect", () => {
                setSocket(null);
                setTimeout(setupSocket, 3000);
                makeToast("error", "Socket Disconnected!");
            });

            newSocket.on("connect", () => {
                makeToast("success", "Socket Connected!");
            });

            setSocket(newSocket);
        }
    };

    React.useEffect(() => {
        setupSocket();
        //eslint-disable-next-line
    }, []);

    //using react router to allow for pages to push/link to new ones
    return (<div className='bg-dark'>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Index} exact />
                    <Route
                        path="/login"
                        render={() => <Login setupSocket={setupSocket} />}
                        exact
                    />
                    <Route path="/register" component={Register} exact />
                    <Route
                        path="/dashboard"
                        render={() => <Dashboard socket={socket} />}
                        exact
                    />
                    <Route
                        path="/chatroom/:id"
                        render={() => <Chatroom socket={socket} />}
                        exact
                    />
                </Switch>
            </BrowserRouter>
    </div>
    );
}

export default App;