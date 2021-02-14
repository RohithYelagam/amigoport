import React, { Component } from 'react'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import "../styles/message.css"


export default class Message extends Component {
    constructor(props){
        super(props);
        this.state={
            msg_body: "msg",
            msg_from: "rohith",
            msg_timestamp: "timestamp",
            photo_url: "#",
        }
    }
    render() {
        return (
            <div className="message">
                <div className="message_profile">
                {/* <AccountCircleRoundedIcon fontSize="large"/> */}
                <img src={this.props.photo_url}></img>
                <div className="msg">
                {/* <h4>{this.props.msg_from}</h4> */}
                <p>{this.props.msg_body}</p>
                </div>
                   
                </div>
                <div className="timestamp">
                {this.props.msg_timestamp}
                </div>
            </div>
        )
    }
}
