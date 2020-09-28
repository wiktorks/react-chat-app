import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";
import "../Authentication/Login"

const Join = () => {

    const group = "JavaScript";
    const group1 = "TestChatRoom"
    const group2 = "JavaFans"
    const name = "name"

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading"><p>[{name}], you are logged in to our chat application.
                    Now choose a room and join the chat</p></h1>


                <Link
                    onClick={event => (!group ? event.preventDefault() : null)}
                    to={`/chat?group=${group}`}
                >
                    <input type="submit" value={group} />
                    <input type="submit" value={group1} />
                    <input type="submit" value={group2} />
                </Link>
            </div>
        </div>
    );
};

export default Join;