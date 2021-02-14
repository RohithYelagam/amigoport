import React from 'react';
import "../styles/rightsidebar.css";
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import Onlineuser from "./onlineuser.js";

function Leftsidebar() {
    var dd="dd";
    return (
        <div className="rightsidebar">
            <div className="rightsidebar_header">
                <SignalCellularAltIcon fontSize="large"/>
                <h4>Online Users</h4>
            </div>

            <div className="online">
                <Onlineuser name={"rrr"}/>
                <Onlineuser name={"rohith"}/>
                <Onlineuser name={"supriya"}/>
                <Onlineuser name={"venkat"}/>
            </div>

        </div>
    )
}

export default Leftsidebar
