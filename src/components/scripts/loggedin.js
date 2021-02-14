import React, { Component } from 'react'
import "../styles/loggedin.css"

import Leftsidebar from "./leftsidebar";
import Chatbar from "./chatbar";
import Rightsidebar from "./rightsidebar";

export default class LoggedIn extends Component {
    render() {
        return (
            <div className="loggedin">
            <Leftsidebar/>
            <Chatbar/>
            <Rightsidebar/>
            </div>
        )
    }
}
