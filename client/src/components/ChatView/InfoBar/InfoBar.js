import React from "react";

import onlineIcon from "../../../img/onlineIcon.png";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import "./InfoBar.css";

const InfoBar = ({ group }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon" />
            <h3>{group}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/">
                <PowerSettingsNewIcon color="primary" style={{fontSize: 35}} />

            </a>
        </div>
    </div>
);

export default InfoBar;