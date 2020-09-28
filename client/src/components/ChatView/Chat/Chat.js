import React, { useState, useEffect } from "react";
import querystring from "query-string";
import io from "socket.io-client";

import "./Chat.css";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';


let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [group, setGroup] = useState("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const END_POINT = "localhost:3001";

    useEffect(() => {
        const { name, group } = querystring.parse(location.search);

        socket = io(END_POINT);

        setName(name);
        setGroup(group);

        socket.emit("join", { name, group }, error => {
            if (error) {
                alert(error);
            }
        });
    }, [END_POINT, location.search]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });

        socket.on("groupData", ({ users }) => {
            setUsers(users);
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [messages]);

    // function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }
    };


    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar group={group} />
                <Messages messages={messages} name={name} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            <TextContainer users={users}/>
        </div>
    );
};

export default Chat;