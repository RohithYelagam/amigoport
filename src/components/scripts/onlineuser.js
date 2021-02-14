import React, { Component } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import "../styles/onlineuser.css"

export default class Onlineuser extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'rohit',
        }
    }
    render() {
        return (
            <div className="onlineuser">
               <FiberManualRecordIcon fontSize="small"/>
               <h5>{this.props.name}</h5>
            </div>
        )
    }
}
