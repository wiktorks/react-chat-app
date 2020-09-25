import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {

    const group = "nazwa grupy z bazy danych";
    const name = "pobrane imię";

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
                    <input type="submit" value={group} />
                    <input type="submit" value={group} />
                </Link>
            </div>
        </div>
    );
};

export default Join;