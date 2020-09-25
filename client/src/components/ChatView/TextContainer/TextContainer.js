import React from "react";
import onlineIcon from "../../../img/onlineIcon.png";

import "./TextContainer.css";
const TextContainer = ({ users }) => (

    <div className="textContainer">
        <div>
            <h1>
                React Chat Application{" "}
                <span role="img" aria-label="emoji">
💬
        </span>
            </h1>
            <h2>
                Welcome in chat application {" "}
                <span role="img" aria-label="emoji">
          ️😃
        </span>
            </h2>
            <h2>
                Active users:{" "}
            </h2>
        </div>
        {users ? (
            <div>
                <h1>People currently chatting:</h1>
                <div className="activeContainer">
                    <h2>
                        {users.map(({ name }) => (
                            <div key={name} className="activeItem">
                                {name}
                                <img alt="Online Icon" src={onlineIcon} />
                            </div>
                        ))}
                    </h2>
                </div>
            </div>
        ) : null}

    </div>
);

export default TextContainer;