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
    const [socket, setSocket] = React.useState(null);

    const setupSocket = () => {
        const token = localStorage.getItem("CC_Token");
        if (token && !socket) {
            const newSocket = io("http://localhost:3000", {
                query: {
                    token: localStorage.getItem("CC_Token"),
                },
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

    return (
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
    );
}

export default App;