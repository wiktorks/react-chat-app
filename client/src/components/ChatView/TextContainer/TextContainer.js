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
            {users ? (
                <div>
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


    </div>
);

export default TextContainer;