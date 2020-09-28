import React from "react";

import "./Input.css";
import SendIcon from '@material-ui/icons/Send';


const Input = ({ setMessage, sendMessage, message }) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Send message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={ (event) => (event.key === "Enter" ? sendMessage(event) : null)}
        />
        <button className="sendButton" onClick={e => sendMessage(e)}>
            <SendIcon style={{ fontSize:35}}></SendIcon>
        </button>



    </form>
);

export default Input;