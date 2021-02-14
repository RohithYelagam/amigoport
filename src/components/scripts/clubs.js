import React from 'react';
import "../styles/clubs.css";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { Component } from 'react';



class Clubs extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"rohith",
        }
    }
    render(){
    return (
        <div className="clubs">
            <div className="club_profile">
            <AccountCircleRoundedIcon fontSize="large" className="club_photo"/>
                <h3>{this.props.name}</h3>
            </div>

            <div className="club_options">
            <MoreVertRoundedIcon/>
            </div>
        </div>
     )
    }
}

export default Clubs
